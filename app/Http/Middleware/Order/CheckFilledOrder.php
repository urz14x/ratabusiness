<?php

namespace App\Http\Middleware\Order;

use App\Models\Order;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckFilledOrder
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $order_status = Order::where('customer_id', $request->id)->orWhere('status', '=', 'Terisi');
        if($order_status){
            return to_route('dashboard');
        }
        return $next($request);
    }
}
