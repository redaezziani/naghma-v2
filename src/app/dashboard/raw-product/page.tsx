
import { getProduct, getProducts } from "@/(db)/product-pr";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";



const RawProducts = async () => {
  const res = await getProducts();
  console.log(res); 

  


  
  return (
    <div className="w-[80%] mt-20">
      <Table>
        <TableCaption>قائمة المنتجات الخام</TableCaption>

        <TableHeader>
          <TableRow>
            <TableCell className="w-[100px]">
              <TableHead>المنتج</TableHead>
            </TableCell>
            <TableCell>
              <TableHead>السعر</TableHead>
            </TableCell>
            <TableCell>
              <TableHead>الكمية</TableHead>
            </TableCell>
            <TableCell className="text-left">
              <TableHead>الإجمالي</TableHead>
            </TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {res.data.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>{product.quantity}</TableCell>
              
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={2}></TableCell>
            <TableCell className="">الإجمالي الكلي</TableCell>
            <TableCell className="text-left">

            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default RawProducts;
