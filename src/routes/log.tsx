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
import {
	logsQueryOptions,
	useCreateLog,
	useCreateLogItem,
	useDeleteLog,
	useDeleteLogItem,
	useLogs,
	useLogsWithItems,
	useUpdateLogItem,
} from "@/api";
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

	const { data: allLogs = [] } = useLogs();
	const createLogMutation = useCreateLog();
	const deleteLogMutation = useDeleteLog();
	const createItemMutation = useCreateLogItem();
	const updateItemMutation = useUpdateLogItem();
	const deleteItemMutation = useDeleteLogItem();

	// Get dates that have logs for highlighting
	const datesWithLogs = useMemo(() => {
		return new Set(allLogs.map((log) => log.date));
	}, [allLogs]);

	// Calculate selected dates array
	const selectedDates = useMemo(() => {
		if (!selectedRange?.from) return [];

		const start = selectedRange.from;
		const end = selectedRange.to || selectedRange.from;

		return eachDayOfInterval({ start, end }).map(formatDateKey);
	}, [selectedRange]);

	// Fetch logs with items for selected dates
	const { data: logsWithItems = [] } = useLogsWithItems(selectedDates);

	// Handle creating a new log for today if it doesn't exist
	const handleCreateTodayLog = () => {
		const todayStr = formatDateKey(today);
		if (!datesWithLogs.has(todayStr)) {
			createLogMutation.mutate(todayStr);
		}
	};

	// Check if today has a log
	const todayHasLog = datesWithLogs.has(formatDateKey(today));

	return (
		<div className="h-[calc(100vh-28px)] overflow-y-auto">
			<div className="max-w-2xl mx-auto p-6 space-y-6">
				{/* Calendar header */}
				<div className="flex flex-col items-center gap-4">
					<div className="flex items-center gap-4">
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
					</div>

					<div className="flex items-center gap-3 text-sm text-muted-foreground">
						<span>
							{selectedDates.length === 1
								? "1 day selected"
								: `${selectedDates.length} days selected`}
						</span>
						{!todayHasLog && (
							<Button
								size="sm"
								variant="outline"
								className="h-7 px-2 text-xs"
								onClick={handleCreateTodayLog}
								disabled={createLogMutation.isPending}
							>
								<Plus className="h-3.5 w-3.5 mr-1" />
								Create today's log
							</Button>
						)}
					</div>
				</div>

				{/* Log entries */}
				{logsWithItems.length === 0 ? (
					<div className="flex flex-col items-center py-12 text-muted-foreground">
						<p className="text-sm">No logs for selected dates</p>
						{selectedDates.length === 1 && (
							<Button
								variant="outline"
								size="sm"
								className="mt-4"
								onClick={() => createLogMutation.mutate(selectedDates[0])}
								disabled={createLogMutation.isPending}
							>
								<Plus className="h-3.5 w-3.5 mr-1" />
								Create log for {formatDisplayDate(selectedDates[0])}
							</Button>
						)}
					</div>
				) : (
					<div className="space-y-8">
						{logsWithItems.map((log) => (
							<LogEntry
								key={log.id}
								log={log}
								displayDate={formatDisplayDate(log.date)}
								onAddItem={(content) =>
									createItemMutation.mutate({
										logId: log.id,
										content,
									})
								}
								onUpdateItem={(id, content) =>
									updateItemMutation.mutate({ id, content })
								}
								onDeleteItem={(id) => deleteItemMutation.mutate(id)}
								onDeleteLog={() => deleteLogMutation.mutate(log.id)}
								isDeleting={deleteLogMutation.isPending}
							/>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
