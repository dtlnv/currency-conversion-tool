import type { History } from "@/lib/types";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { MAX_HISTORY_CAPACITY } from "@/lib/config";

interface LatestHistoryProps {
    history: History[];
}

export function LatestHistory({ history }: LatestHistoryProps) {
    return (
        <div className="border-t-1 pt-8 mt-8">
            <h2 className="text-center">History</h2>
            <p className="text-center text-sm text-gray-600">Latest {MAX_HISTORY_CAPACITY} items</p>
            <Table className="mt-4">
                <TableHeader>
                    <TableRow>
                        <TableHead>Currency From</TableHead>
                        <TableHead>Currency To</TableHead>
                        <TableHead>Amount From</TableHead>
                        <TableHead>Amount To</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {history.map((el) => (
                        <TableRow key={el.id}>
                            <TableCell>{el.currencyFrom}</TableCell>
                            <TableCell>{el.currencyTo}</TableCell>
                            <TableCell>{el.amountFrom}</TableCell>
                            <TableCell>{el.amountTo}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableCaption>
                    {history.length === 0 && "No history yet."}
                </TableCaption>
            </Table>
        </div>
    )
}
