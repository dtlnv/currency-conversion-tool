import type { History } from "@/lib/types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";

interface LatestHistoryProps {
    history: History[];
}

export function LatestHistory({ history }: LatestHistoryProps) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Currency From</TableHead>
                    <TableHead>Currency To</TableHead>
                    <TableHead>Amount From</TableHead>
                    <TableHead>Amount To</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {history.map((el, i) => {
                    const key = el.amountFrom + el.amountTo + el.currencyFrom + el.currencyTo + i;
                    return (
                        <TableRow key={key}>
                            <TableCell>{el.currencyFrom}</TableCell>
                            <TableCell>{el.currencyTo}</TableCell>
                            <TableCell>{el.amountFrom}</TableCell>
                            <TableCell>{el.amountTo}</TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    )
}