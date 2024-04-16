<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Product;
use App\Http\Requests\ProductStoreRequest;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage; //php artisan storage:link = php artisan storage:link = http://127.0.0.1:8000/storage/1.jpg

class ProductController extends Controller
{
    public function index()
    {
        //$products = Product::all(); // All Product

        $products = Product::paginate(5);

        // Return Json Response
        return response()->json([
            'products' => $products
        ], 200);
    }

    public function store(ProductStoreRequest $request)
    {
        try {

            $name = $request->name;
            $price = $request->price;
            $imageName = Str::random(32) . "." . $request->image->getClientOriginalExtension();

            Storage::disk('public')->put($imageName, file_get_contents($request->image));

            Product::create([
                'name' => $name,
                'image' => $imageName,
                'price' => $price
            ]);

            // Return Json Response
            return response()->json([
                'results' => "Product successfully created. '$name' -- '$imageName' -- '$price' "
            ], 200);
        } catch (\Exception $e) {
            // Return Json Response
            return response()->json([
                'message' => "Something went really wrong!"
            ], 500);
        }
    }

    public function show($id)
    {
        // Product Detail 
        $product = Product::find($id);
        if (!$product) {
            return response()->json([
                'message' => 'Product Not Found.'
            ], 404);
        }

        // Return Json Response
        return response()->json([
            'product' => $product
        ], 200);
    }

    public function update(ProductStoreRequest $request, $id)
    {
        try {
            // Find product
            $product = Product::find($id);
            if (!$product) {
                return response()->json([
                    'message' => 'Product Not Found.'
                ], 404);
            }

            echo "request : $request->image";
            $product->name = $request->name;
            $product->price = $request->price;

            if ($request->image) {

                // Public storage
                $storage = Storage::disk('public');

                // Old iamge delete
                if ($storage->exists($product->image))
                $storage->delete($product->image);

                // Image name
                $imageName = Str::random(32) . "." . $request->image->getClientOriginalExtension();
                $product->image = $imageName;

                // Image save in public folder
                $storage->put($imageName, file_get_contents($request->image));
            }

            // Update Product
            $product->save();

            // Return Json Response
            return response()->json([
                'message' => "Product successfully updated."
            ], 200);
            
        } catch (\Exception $e) {
            // Return Json Response
            return response()->json([
                'message' => "Something went really wrong!"
            ], 500);
        }
    }

    public function destroy($id)
    {
        // Detail 
        $product = Product::find($id);
        if (!$product) {
            return response()->json([
                'message' => 'Product Not Found.'
            ], 404);
        }

        // Public storage
        $storage = Storage::disk('public');

        // Iamge delete
        if ($storage->exists($product->image))
            $storage->delete($product->image);

        // Delete Product
        $product->delete();

        // Return Json Response
        return response()->json([
            'message' => "Product successfully deleted."
        ], 200);
    }
}
