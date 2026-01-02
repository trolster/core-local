import { createFileRoute } from "@tanstack/react-router";
import {
	eachDayOfInterval,
	format,
	parseISO,
	subDays,
	subMonths,
} from "date-fns";
import { Plus } from "lucide-react";
import { useMemo, useState } from "react";
import type { DateRange } from "react-day-picker";
import { logsQueryOptions, useLogs } from "@/api";
import { LogEntry } from "@/components/log-entry";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

export const Route = createFileRoute("/log")({
	loader: ({ context }) =>
		context.queryClient.ensureQueryData(logsQueryOptions()),
	component: LogPage,
});

function formatDateKey(date: Date): string {
	return format(date, "yyyy-MM-dd");
}

function formatDisplayDate(dateStr: string): string {
	return format(parseISO(dateStr), "EEEE, MMMM d, yyyy");
}

function LogPage() {
	const today = useMemo(() => new Date(), []);
	const calendarStartMonth = useMemo(() => subMonths(today, 2), [today]);
	const oneWeekAgo = useMemo(() => subDays(today, 6), [today]);
	const [selectedRange, setSelectedRange] = useState<DateRange | undefined>({
		from: oneWeekAgo,
		to: today,
	});

	// Calculate selected dates array
	const selectedDates = useMemo(() => {
		if (!selectedRange?.from) return [];
		const start = selectedRange.from;
		const end = selectedRange.to || selectedRange.from;
		return eachDayOfInterval({ start, end }).map(formatDateKey);
	}, [selectedRange]);

	const { logs, createLog, deleteLog, createLogItem, updateLogItem, deleteLogItem } = useLogs();

	const datesWithLogs = useMemo(() => new Set(logs.map((log) => log.date)), [logs]);
	const todayHasLog = datesWithLogs.has(formatDateKey(today));
	const selectedLogs = useMemo(
		() => logs.filter((log) => selectedDates.includes(log.date)),
		[logs, selectedDates],
	);

	return (
		<div className="h-[calc(100vh-28px)] overflow-y-auto">
			<div className="max-w-2xl mx-auto p-6 space-y-6">
				<div className="flex flex-col items-center gap-4">
					<Calendar
						mode="range"
						selected={selectedRange}
						onSelect={setSelectedRange}
						disabled={{ after: today }}
						defaultMonth={calendarStartMonth}
						modifiers={{
							hasLog: (date) => datesWithLogs.has(formatDateKey(date)),
						}}
						className="rounded-md border"
						numberOfMonths={3}
					/>

					<div className="flex items-center gap-3 text-sm text-muted-foreground">
						<span>
							{`${selectedDates.length} day${selectedDates.length !== 1 ? "s" : ""} selected`}
						</span>
						{!todayHasLog && (
							<Button
								size="sm"
								variant="outline"
								className="h-7 px-2 text-xs"
								onClick={() => createLog.mutate(formatDateKey(today))}
								disabled={createLog.isPending}
							>
								<Plus className="h-3.5 w-3.5 mr-1" />
								Create today's log
							</Button>
						)}
					</div>
				</div>

				{selectedLogs.length === 0 ? (
					<div className="flex flex-col items-center py-12 text-muted-foreground">
						<p className="text-sm">No logs for selected dates</p>
						{selectedDates.length === 1 && (
							<Button
								variant="outline"
								size="sm"
								className="mt-4"
								onClick={() => createLog.mutate(selectedDates[0])}
								disabled={createLog.isPending}
							>
								<Plus className="h-3.5 w-3.5 mr-1" />
								Create log for {formatDisplayDate(selectedDates[0])}
							</Button>
						)}
					</div>
				) : (
					<div className="space-y-8">
						{selectedLogs.map((log) => (
							<LogEntry
								key={log.id}
								log={log}
								displayDate={formatDisplayDate(log.date)}
								onAddItem={(content) => createLogItem.mutate({ logId: log.id, content })}
								onUpdateItem={(id, content) => updateLogItem.mutate({ id, content })}
								onDeleteItem={(id) => deleteLogItem.mutate(id)}
								onDeleteLog={() => deleteLog.mutate(log.id)}
								isDeleting={deleteLog.isPending}
							/>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
