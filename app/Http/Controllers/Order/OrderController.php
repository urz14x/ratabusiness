<?php

namespace App\Http\Controllers\Order;

use App\Http\Controllers\Controller;
use App\Http\Resources\Customer\CustomerResource;
use App\Http\Resources\Order\SingleOrderResource;
use App\Http\Resources\OrderResource;
use App\Models\Customer;
use App\Models\Order;
use App\Models\OrderProduct;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $limit = $request->input('limit', 5);
        $search = $request->input('search');
        $orders = OrderResource::collection(Order::query()->with('customer')->whereHas('customer', function($query) use ($search) {
            $query->where('name', 'like', '%' . $search . '%');
        })->latest()->paginate(5));
        return Inertia::render('Order-lists/Index', [
            'orders' => fn() => $orders,
            'state' => $request->only('limit', 'page', 'search')
        ]);
    }


    public function create(Request $request)
    {
        $search = $request->input('search');
        $customers = SingleOrderResource::collection(Customer::query()->with('orders')->where('name', 'like', '%' . $search . '%')->paginate(5));

        return Inertia::render('Order-lists/ChooseCustomer', [
            'customers' => fn() => $customers,
            'state' => $request->only('search')
        ]);
    }

    public function store(Request $request)
    {
        $attributes = $request->validate([
            'customer_id' => 'required|integer',
            'comments' => 'required|string',
        ]);

        Order::create($attributes);
        return Inertia::location(route('order.list.index'));
    }

    public function order(Request $request, $id){
        $order = Customer::query()->where('id', $id)->first();
        $attributes['customer_id'] = $id;

        if(Order::where('customer_id', $id)->exists()){
            return Inertia::render('Order-lists/Order', [
                'order' => $order,
                'product' => Product::get(),
                'order_id' => Order::where('customer_id', $id)->first()->id,
            ]);
        }
        Order::create($attributes);
        return Inertia::render('Order-lists/Order', [
            'order' => $order,
            'product' => Product::get(),
            'order_id' => Order::where('customer_id', $id)->first()->id,
        ]);
    }

    public function createOrder(Request $request, $id){
        $createOrder = $request->validate([
            'order_id' => 'required|integer',
            'product_id' => 'required|integer',
            'description' => 'required|string',
            'quantity' => 'required|integer',
        ]);
        $order_status = Order::where('customer_id', $id);
        if($order_status){
            $order_status->update(["status" => "Terisi"]);
        }
        OrderProduct::create($createOrder);
        return to_route('order.list.index');
    }
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Order $order)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $order = Order::find($id);
        $order->delete();

        return back();
    }


    public function cancelOrder($id){
        $order = Order::where('customer_id', $id)->first();
        $order->delete();
        return to_route('order.list.index');
    }
//    Contoh Jika ingin menghapus order-nya saja
//    public function destroy($id){
//        $order = Customer::find($id);
//        $order->orders()->delete();

//        return 'berhasil';
//    }
}
