<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'payment_status' => $this->payment_status,
            'order_category' => $this->order_category,
            'amount' => $this->amount,
            'date' => $this->created_at->diffForHumans()
        ];
    }
}
