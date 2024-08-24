import React, { useState } from "react";
import { Label } from "@/Components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { useForm } from "@inertiajs/react";


export default function FormNewOrder() {
    const [isPaid, setIsPaid] = useState(false);
    const { data, setData, post, errors, processing, reset } = useForm({
        name: "",
        order_category: "",
        payment_status: "",
        amount: null,
    });
    console.log(data.payment_status);
    console.log(data.amount);
    const handleOrdersName = (val) => {
        setData("order_category", val);
    };
    const handlePaymentStatus = (val) => {
        setData("payment_status", val);
        if (val === "Lunas") {
            setIsPaid(true);
        } else if (val === "Pending") {
            setIsPaid(false);
        }
    };
    const handleNewOrder = (e) => {
        e.preventDefault();
        post(route("order.list.store"));
    };
    return (
        <form
            className="flex flex-col space-y-3 text-xs"
            onSubmit={handleNewOrder}
        >
            <div>
                <Label htmlFor="name">Nama Pemesan :</Label>
                <Input
                    type="text"
                    id="name"
                    value={data.name}
                    onChange={(e) => setData("name", e.target.value)}
                    placeholder="Tasya Fitri Sawaliyah"
                />
                {errors.name && <p className="text-red-700">Wajib di isi!</p>}
            </div>
            <div>
                <Label htmlFor="order_category">Kategori Pesanan :</Label>
                <Select onValueChange={handleOrdersName}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Pilih Kategori Pemesanan" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Pembuatan website">
                            Pembuatan Website
                        </SelectItem>
                        <SelectItem value="Desain PPT">Desain PPT</SelectItem>
                        <SelectItem value="Desain Banner">
                            Desain Banner
                        </SelectItem>
                    </SelectContent>
                </Select>
                {errors.order_category && (
                    <p className="text-red-700">Wajib di isi!</p>
                )}
            </div>
            <div>
                <Label htmlFor="payment_status" className="mb-2">
                    Status Pembayaran :
                </Label>
                <Select id="payment_status" onValueChange={handlePaymentStatus}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Pilih Status Pembayaran" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Lunas">Lunas</SelectItem>
                        <SelectItem value="Pending">Pending</SelectItem>
                    </SelectContent>
                </Select>
                {errors.payment_status && (
                    <p className="text-red-700">Wajib di isi!</p>
                )}
            </div>
            {isPaid ? (
                <div>
                    <Label htmlFor="amount">Jumlah :</Label>
                    <Input
                        type="text"
                        id="amount"
                        value={data.amount}
                        onChange={(e) =>
                            setData("amount", e.target.value)
                        }
                        placeholder="250.000"
                    />
                    {errors.amount && (
                        <p className="text-red-700">Wajib di isi!</p>
                    )}
                </div>
            ) : null}

            <Button type="submit" disabled={processing}>
                Buat Pesanan!
            </Button>
        </form>

    );
}
