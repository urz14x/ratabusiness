<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Http\Resources\Customer\CustomerResource;
use App\Models\Customer;
use App\Models\Order;
use Illuminate\Http\Request;

class CustomerController extends Controller
{
    public function index(Request $request)
    {
      $search = $request->input('search');
      $limit = $request->input('limit', 5);
      $customers = CustomerResource::collection(Customer::query()->where('name', 'like', '%'. $search . '%')->latest()->paginate($limit));
      return inertia('Customer/Index', [
          'customers' => fn() => $customers,
          'count' => fn() => Customer::count(),
          'state' => $request->only('search', 'limit')
      ]);
    }
    public function create(){
        return inertia('Customer/Create');
    }
    public function store(Request $request){
        $attributes = $request->validate([
            'name' => 'required|string|min:3|max:100',
            'email' => 'required|string|lowercase|email|max:255|unique:'.Customer::class,
            'address' => 'required|string|min:3|max:100',
            'phone' => 'required|min:11|max:12',
            'gender' => 'required|string'
        ]);
        Customer::create($attributes);
        return to_route('customer.index');
    }
    public function destroy($id){
        $order = Customer::find($id);
        $order->orders()->delete();
        $order->delete();
        return 'berhasil';
    }
}
