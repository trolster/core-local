import { Link } from "@tanstack/react-router";
import { Moon, Sun, User } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "@/lib/dark-mode";

export function Navigation() {
	const { theme, toggleTheme } = useTheme();

	return (
		<nav className="border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
			<div className="container mx-auto px-6 h-14 flex items-center justify-between">
				<div className="flex items-center gap-6">
					<Link to="/" className="font-semibold text-lg">
						CORE
					</Link>

					<div className="flex items-center gap-1">
						{/* CORE Sections Dropdown */}
						<DropdownMenu>
							<DropdownMenuTrigger className="px-3 py-1.5 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground transition-colors">
								CORE Sections
							</DropdownMenuTrigger>
							<DropdownMenuContent align="start" className="w-48">
								<DropdownMenuLabel>Foundation</DropdownMenuLabel>
								<Link to="/sections/drivers">
									<DropdownMenuItem>Drivers</DropdownMenuItem>
								</Link>
								<Link to="/sections/problems">
									<DropdownMenuItem>Problems</DropdownMenuItem>
								</Link>

								<DropdownMenuSeparator />
								<DropdownMenuLabel>Direction</DropdownMenuLabel>
								<Link to="/sections/missions">
									<DropdownMenuItem>Missions</DropdownMenuItem>
								</Link>
								<Link to="/sections/goals">
									<DropdownMenuItem>Goals</DropdownMenuItem>
								</Link>

								<DropdownMenuSeparator />
								<DropdownMenuLabel>Execution</DropdownMenuLabel>
								<Link to="/sections/challenges">
									<DropdownMenuItem>Challenges</DropdownMenuItem>
								</Link>
								<Link to="/sections/constraints">
									<DropdownMenuItem>Strategies</DropdownMenuItem>
								</Link>
								<Link to="/sections/projects">
									<DropdownMenuItem>Projects</DropdownMenuItem>
								</Link>
								<Link to="/sections/narratives">
									<DropdownMenuItem>Narratives</DropdownMenuItem>
								</Link>
							</DropdownMenuContent>
						</DropdownMenu>

						{/* Context Dropdown */}
						<DropdownMenu>
							<DropdownMenuTrigger className="px-3 py-1.5 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground transition-colors">
								Context
							</DropdownMenuTrigger>
							<DropdownMenuContent align="start" className="w-48">
								<DropdownMenuItem disabled>Today</DropdownMenuItem>
								<DropdownMenuItem disabled>This Week</DropdownMenuItem>
								<DropdownMenuItem disabled>This Month</DropdownMenuItem>
								<DropdownMenuSeparator />
								<DropdownMenuItem disabled>Custom Range</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>

						{/* Settings Dropdown */}
						<DropdownMenu>
							<DropdownMenuTrigger className="px-3 py-1.5 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground transition-colors">
								Settings
							</DropdownMenuTrigger>
							<DropdownMenuContent align="start" className="w-48">
								<DropdownMenuItem disabled>Preferences</DropdownMenuItem>
								<DropdownMenuItem disabled>Data Management</DropdownMenuItem>
								<DropdownMenuSeparator />
								<DropdownMenuItem disabled>Export</DropdownMenuItem>
								<DropdownMenuItem disabled>Import</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</div>

				<div className="flex items-center gap-4">
					{/* Dark Mode Toggle */}
					<div className="flex items-center gap-2">
						<Sun className="h-4 w-4 text-muted-foreground" />
						<Switch checked={theme === "dark"} onCheckedChange={toggleTheme} />
						<Moon className="h-4 w-4 text-muted-foreground" />
					</div>

					{/* User Menu */}
					<DropdownMenu>
						<DropdownMenuTrigger className="focus:outline-none">
							<Avatar className="h-8 w-8 cursor-pointer ring-2 ring-transparent hover:ring-accent transition-all">
								<AvatarFallback>
									<User className="h-4 w-4" />
								</AvatarFallback>
							</Avatar>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end" className="w-48">
							<DropdownMenuLabel>My Account</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem disabled>Profile</DropdownMenuItem>
							<DropdownMenuItem disabled>Account Settings</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem disabled>Sign Out</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
		</nav>
	);
}
