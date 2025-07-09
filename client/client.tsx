'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { CalendarPlusIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { getAquarusPhosphatePlusDose } from './getAquarusPhosphatePlusDose';
import { normal } from './constants';
import { getAquarusNitratePlusDose } from './getAquarusNitratePlusDose';

interface Item {
    date: string;
    po4: string;
    no3: string;
}

interface ClientProps {
    data: Array<Item>;
}

export const Client = ({ data }: ClientProps) => {
    const router = useRouter();

    const [formState, setFormState] = useState<Item>({ date: '', po4: '', no3: '' });

    const [isLoading, setIsLoading] = useState(false);

    const add = async () => {
        try {
            setIsLoading(true);

            await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/db`, {
                method: 'POST',
                body: JSON.stringify(formState),
                headers: { 'Content-Type': 'application/json' },
            });

            setFormState(() => ({ date: '', po4: '', no3: '' }));

            router.refresh();
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    const isValid = Object.values(formState).every((value) => value !== '');

    return (
        <div className={cn('flex', 'flex-col', 'w-full', 'h-full')}>
            <div className={cn('flex', 'flex-row', 'grow-0', 'p-2')}>
                <div className={cn('grid', 'grid-cols-4', 'gap-2')}>
                    <div className="grid w-full max-w-sm items-center gap-3">
                        <Label htmlFor="date">Дата</Label>
                        <Input
                            type="date"
                            id="date"
                            placeholder="Дата"
                            disabled={isLoading}
                            value={formState.date}
                            onChange={(e) =>
                                setFormState((prev) => {
                                    return { ...prev, date: e.target.value };
                                })
                            }
                        />
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-3">
                        <Label htmlFor="Po4">Po4</Label>
                        <Input
                            type="number"
                            id="Po4"
                            placeholder="Po4"
                            disabled={isLoading}
                            value={formState.po4}
                            onChange={(e) =>
                                setFormState((prev) => {
                                    return { ...prev, po4: e.target.value };
                                })
                            }
                        />
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-3">
                        <Label htmlFor="No3">No3</Label>
                        <Input
                            type="number"
                            id="No3"
                            placeholder="No3"
                            disabled={isLoading}
                            value={formState.no3}
                            onChange={(e) =>
                                setFormState((prev) => {
                                    return { ...prev, no3: e.target.value };
                                })
                            }
                        />
                    </div>
                    <div className="grid w-full max-w-sm items-end gap-3 p-0.5">
                        <Button
                            variant="secondary"
                            size="icon"
                            className="size-8"
                            disabled={isLoading || !isValid}
                            onClick={add}
                        >
                            <CalendarPlusIcon />
                        </Button>
                    </div>
                </div>
            </div>
            <div className={cn('grow-1')}>
                <Table>
                    <TableCaption>Лист учета Redfield</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Дата</TableHead>
                            <TableHead>Po4</TableHead>
                            <TableHead>No3</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell className="font-medium">{item.date}</TableCell>
                                <TableCell>
                                    <div className={cn('grid', 'grid-cols-4')}>
                                        <div>измерено - {item.po4} mg/l</div>
                                        <div className={cn('text-green-500')}>
                                            норма - {normal.po4} mg/l
                                        </div>
                                        <div className={cn('text-red-500')}>
                                            недобор - {(normal.po4 - +item.po4).toFixed(2)} mg/l
                                        </div>
                                        <div className={cn('text-orange-500')}>
                                            препарат -{' '}
                                            {getAquarusPhosphatePlusDose(+item.po4).toFixed(2)} ml
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className={cn('grid', 'grid-cols-4')}>
                                        <div>измерено - {item.no3} mg/l</div>
                                        <div className={cn('text-green-500')}>
                                            норма - {normal.no3} mg/l
                                        </div>
                                        <div className={cn('text-red-500')}>
                                            недобор - {(normal.no3 - +item.no3).toFixed(2)} mg/l
                                        </div>
                                        <div className={cn('text-orange-500')}>
                                            препарат -{' '}
                                            {getAquarusNitratePlusDose(+item.no3).toFixed(2)} ml
                                        </div>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={3}>Среднее значение Redfield</TableCell>
                            <TableCell className="text-right">~</TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </div>
        </div>
    );
};
