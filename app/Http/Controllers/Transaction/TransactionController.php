<?php

namespace App\Http\Controllers\Transaction;

use App\Http\Controllers\Controller;
use App\Http\Resources\OrderResource;
use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TransactionController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');
        $limit = $request->input('limit', 5);
        $orders = OrderResource::collection(Order::query()->whereHas('customer', function($query) use ($search){
            $query->where('name', 'like', '%' . $search . '%');
        })->latest()->paginate($limit));
        return Inertia::render('Transaction/index', [
            'orders' => fn () => $orders,
            'state' => $request->only('search', 'limit')
        ]);
    }
    public function payment($id)
    {
        $order = Order::query()->with('customer')->where('id', $id)->first();
        if (is_null($order)) {
            abort(404);
        }
        return Inertia::render('Order-lists/Payment', compact('order'));
    }
    public function updatePayment(Request $request, $id)
    {
        $request->validate([
            'amount' => 'required|integer',
        ]);
        $order = Order::find($id);

        if ($order->amount == null) {
            $order->amount = $request->amount;
            $order->payment_status = "Lunas";
        }
        $order->save();

        return to_route('order.list.index');
    }
}
