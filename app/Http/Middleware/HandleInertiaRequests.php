<?php

namespace App\Http\Middleware;

use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
            'ziggy' => fn () => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
            'wallet' => DB::table('orders')->sum('amount'),
            'total' => [
                'order' => Order::count(),
                'website' => Order::query()->where('order_category', 'like', '%'. 'Pembuatan Website' .'%')->count(),
                'design' => Order::query()->where('order_category', 'like', '%'. 'Desain PPT' .'%')->count(),
                'banner' => Order::query()->where('order_category', 'like', '%'. 'Desain Banner' .'%')->count(),
            ]
        ];
    }
}
