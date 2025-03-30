<?php

namespace App\Http\Controllers\Transaction;

use App\Http\Controllers\Controller;
use App\Http\Resources\OrderResource;
use App\Models\Customer;
use App\Models\Order;
use App\Models\Payment;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PaymentController extends Controller
{
    public function index(Request $request)
    {
        $limit = $request->input('limit', 5);
        $search = $request->input('search');
        $orders = OrderResource::collection(Order::query()->with('customer')->whereHas('customer', function($query) use ($search) {
            $query->where('name', 'like', '%' . $search . '%');
        })->latest()->paginate(5));
        return Inertia::render('Transaction/Index', [
            'orders' => fn() => $orders,
            'state' => $request->only('limit', 'page', 'search')
        ]);
    }
}
