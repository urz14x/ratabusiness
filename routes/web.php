<?php

use App\Http\Controllers\Customer\CustomerController;
use App\Http\Controllers\Dashboard\DashboardController;
use App\Http\Controllers\Export\ExportToPDFContoller;
use App\Http\Controllers\Order\OrderController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Settings\SettingController;
use App\Http\Controllers\Transaction\PaymentController;
use App\Http\Controllers\Product\ProductController;
use \App\Http\Controllers\Guest\ScanProductController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', DashboardController::class)->middleware(['auth', 'verified'])->name('dashboard');



Route::middleware('auth')->group(function () {
    Route::get('/pelanggan', [CustomerController::class, 'index'])->name('customer.index');
    Route::get('/pelanggan/baru', [CustomerController::class, 'create'])->name('customer.create');
    Route::post('/pelanggan/baru', [CustomerController::class, 'store'])->name('customer.store');
    Route::delete('/pelanggan/{id}/hapus', [CustomerController::class, 'destroy'])->name('customer.destroy');


    Route::get("/daftar-pesanan", [OrderController::class, 'index'])->name('order.list.index');
    Route::post("/daftar-pesanan", [OrderController::class, 'store'])->name('order.list.store');
    Route::delete("/daftar-pesanan/{id}", [OrderController::class, 'destroy']);


    Route::get("/daftar-pesanan/buat", [OrderController::class, 'create'])->name('order.list.create');
    Route::get("/daftar-pesanan/buat/{id}/pesanan", [OrderController::class, 'order'])->name('order.list.single');
    Route::post("/daftar-pesanan/buat/{id}/pesanan", [OrderController::class, 'createOrder'])->name('order.list.single.create');
    Route::delete("/daftar-pesanan/{id}/batal", [OrderController::class, 'cancelOrder'])->name('order.list.delete');
    Route::delete('/daftar-pesanan/{id}/pesanan/hapus', [OrderController::class, 'destroy'])->name('order.list.destroy');

    Route::get("/transaksi", [PaymentController::class, 'index'])->name('payment.index');


    Route::get("/produk", [ProductController::class, 'index'])->name('product.index');
    Route::post("/produk/baru", [ProductController::class, 'store'])->name('product.store');

    //Export Invoice
    Route::get('/cetak-faktur/{id}', [ExportToPDFContoller::class, 'generatePDF'])->name('invoice.pdf');
    //Customer
    Route::post('/daftar-pesanan/buat', [CustomerController::class, 'store'])->name('customer.store');

    //Settings
    Route::get('/pengaturan', [SettingController::class, 'index'])->name('setting.index');



    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/pesanan/1/scan/abc', ScanProductController::class)->name('scan.guest');

require __DIR__ . '/auth.php';
