import { Card } from "@/components/ui/card"
const DataCard = ({value ,title}: {value: number, title: string}) => {
  return (
    <Card className="w-full col-span-1 relative  shadow-none  overflow-hidden h-20 p-2 flex justify-between items-center border rounded-lg">
              <div
                className=' '
              >
                <p className="text-xs text-bold">
                    {title}
                </p>
                <p className="font-bold text-xl text-destructive mt-1">
                  {value} د.م
                </p>
              </div>
    </Card>
  )
}

export default DataCard