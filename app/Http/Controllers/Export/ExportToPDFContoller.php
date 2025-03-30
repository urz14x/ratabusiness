<?php

namespace App\Http\Controllers\Export;

use App\Http\Controllers\Controller;
use App\Models\Order;

use Barryvdh\DomPDF\Facade\Pdf;
class ExportToPDFContoller extends Controller
{
    public function generatePDF($id){
        $order = Order::query()->with('customer')->where('id', $id)->first();
        $data = [
            'title' => 'Rata business',
            'order' => $order
        ];
        $pdf = Pdf::loadView('invoice.invoice-order', $data)->setPaper('a4', 'portrait')->setWarnings(false);

        return $pdf->download('invoices.pdf');

    }
}
