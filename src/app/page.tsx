import { getBestSellingProductPrice } from "@/(db)/helpers";
import { getProducts } from "@/(db)/product-pr";

const Home =async () => {
  const res = await getProducts();
  const products = res.data;
  console.log(products);
  const data = [
    {
    id:"429a2dd3-68d8-4e5a-a695-289485076b64",
    percentage: 60
    },
    {
    id:"b43b6443-1f0b-4236-ba74-ecba00d5efc4",
    percentage: 30
    },
    {
    id:"57f99586-81a6-43bc-a727-eec3b81f37e3",
    percentage: 10
    },
  ]

  const res2 = await getBestSellingProductPrice(data);
  console.log(res2);
  return (
    <main className="flex min-h-screen flex-col items-center relative justify-center p-24">
      {
        res2.status === 'success' ? (
          <div
          className="flex flex-col items-start justify-center w-full h-full p-8 bg-white rounded-lg shadow-lg text-center gap-3"
          >
            <h1 className="text-4xl font-bold">تم حساب سعر البيع الأفضل بنجاح للمنتج النهائي لكل كجم</h1>
            <p className="text-2xl">السعر بدون ضريبة: {res2.data.priceWhiteoutTax.toFixed(2)}</p>
            <p className="text-2xl">السعر بضريبة السلع البيضاء: {res2.data.price_white_goods.toFixed(2)}</p>
            <p className="text-2xl">السعر لكل 1000 كجم: {res2.data.price_for_1000_kg}</p>
          </div>
        ) : (
          <h1 className="text-4xl font-bold">{res2.message}</h1>
        )
      }
    </main>
  );
}

export default Home;
