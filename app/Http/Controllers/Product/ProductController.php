<?php

namespace App\Http\Controllers\Product;

use App\Http\Controllers\Controller;
use App\Http\Resources\Customer\CustomerResource;
use App\Http\Resources\Product\ProductResource;
use App\Models\Customer;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ProductController extends Controller
{
    public function index(){
        $products = ProductResource::collection(Product::latest()->paginate(5));

        return inertia('Product/Index', [
            'products' => fn() => $products
        ]);
    }

    public function store(Request $request){
        $attributes = $request->validate([
            'name' => 'required|string',
            'status' => 'required|string',
        ]);

        $attributes['slug'] = Str::slug($request->name);
        Product::create($attributes);
        return to_route('product.index');
    }
}
