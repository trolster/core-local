import { Link } from "@tanstack/react-router";
import { Moon, Sun } from "lucide-react";
import { CoreLogo } from "@/components/core-logo";
import { useCallback, useState } from "react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { contextConfigs, validContextCategories } from "@/config/sections";
import { useTheme } from "@/hooks/use-theme";

type MenuId = "log" | "sections" | "context" | "view" | "settings" | "help" | null;

function MenuItem({
	children,
	disabled,
	className = "",
}: {
	children: React.ReactNode;
	disabled?: boolean;
	className?: string;
}) {
	return (
		<DropdownMenuItem
			disabled={disabled}
			className={`text-[13px] px-2.5 py-1.5 rounded cursor-default ${className}`}
		>
			{children}
		</DropdownMenuItem>
	);
}

function MenuSectionLabel({ children }: { children: React.ReactNode }) {
	return (
		<div className="px-2.5 py-1 text-[11px] font-medium text-muted-foreground uppercase tracking-wide">
			{children}
		</div>
	);
}

export function Navigation() {
	const { theme, toggleTheme } = useTheme();
	const [activeMenu, setActiveMenu] = useState<MenuId>(null);

	const handleMenuOpen = useCallback((menuId: MenuId) => {
		setActiveMenu(menuId);
	}, []);

	const handleMenuClose = useCallback(() => {
		setActiveMenu(null);
	}, []);

	const handleTriggerHover = useCallback(
		(menuId: MenuId) => {
			if (activeMenu !== null && activeMenu !== menuId) {
				setActiveMenu(menuId);
			}
		},
		[activeMenu],
	);

	const triggerClassName =
		"px-2.5 py-1 text-[13px] font-medium rounded hover:bg-foreground/10 active:bg-foreground/15 transition-colors focus:outline-none data-[state=open]:bg-foreground/10";

	const contentClassName =
		"min-w-[180px] rounded-lg p-1 shadow-lg border-border/50 bg-popover/95 backdrop-blur-xl";

	return (
		<nav className="h-7 flex items-center bg-background/80 backdrop-blur-xl border-b border-border/40 select-none">
			<div className="flex items-center px-3 w-full">
				{/* App logo */}
				<Link
					to="/"
					className="mr-4 hover:opacity-70 transition-opacity"
				>
					<CoreLogo size={18} />
				</Link>

				{/* Menu items */}
				<div className="flex items-center gap-0.5">
					{/* Log Link */}
					<Link
						to="/log"
						className={triggerClassName}
					>
						Log
					</Link>

					{/* Sections Menu */}
					<DropdownMenu
						modal={false}
						open={activeMenu === "sections"}
						onOpenChange={(open) =>
							open ? handleMenuOpen("sections") : handleMenuClose()
						}
					>
						<DropdownMenuTrigger
							className={triggerClassName}
							onMouseEnter={() => handleTriggerHover("sections")}
						>
							Sections
						</DropdownMenuTrigger>
						<DropdownMenuContent
							className={contentClassName}
							sideOffset={4}
							align="start"
						>
							<MenuSectionLabel>Foundation</MenuSectionLabel>
							<Link to="/sections/$section" params={{ section: "drivers" }}>
								<MenuItem>Drivers</MenuItem>
							</Link>
							<Link to="/sections/$section" params={{ section: "problems" }}>
								<MenuItem>Problems</MenuItem>
							</Link>

							<DropdownMenuSeparator className="my-1" />
							<MenuSectionLabel>Direction</MenuSectionLabel>
							<Link to="/sections/$section" params={{ section: "missions" }}>
								<MenuItem>Missions</MenuItem>
							</Link>
							<Link to="/sections/$section" params={{ section: "goals" }}>
								<MenuItem>Goals</MenuItem>
							</Link>

							<DropdownMenuSeparator className="my-1" />
							<MenuSectionLabel>Execution</MenuSectionLabel>
							<Link to="/sections/$section" params={{ section: "challenges" }}>
								<MenuItem>Challenges</MenuItem>
							</Link>
							<Link to="/sections/$section" params={{ section: "constraints" }}>
								<MenuItem>Constraints</MenuItem>
							</Link>
							<Link to="/sections/$section" params={{ section: "projects" }}>
								<MenuItem>Projects</MenuItem>
							</Link>
							<Link to="/sections/$section" params={{ section: "narratives" }}>
								<MenuItem>Narratives</MenuItem>
							</Link>
						</DropdownMenuContent>
					</DropdownMenu>

					{/* Context Menu */}
					<DropdownMenu
						modal={false}
						open={activeMenu === "context"}
						onOpenChange={(open) =>
							open ? handleMenuOpen("context") : handleMenuClose()
						}
					>
						<DropdownMenuTrigger
							className={triggerClassName}
							onMouseEnter={() => handleTriggerHover("context")}
						>
							Context
						</DropdownMenuTrigger>
						<DropdownMenuContent
							className={contentClassName}
							sideOffset={4}
							align="start"
						>
							{validContextCategories.map((category) => (
								<Link
									key={category}
									to="/context/$category"
									params={{ category }}
								>
									<MenuItem>{contextConfigs[category].title}</MenuItem>
								</Link>
							))}
						</DropdownMenuContent>
					</DropdownMenu>

					{/* View Menu */}
					<DropdownMenu
						modal={false}
						open={activeMenu === "view"}
						onOpenChange={(open) =>
							open ? handleMenuOpen("view") : handleMenuClose()
						}
					>
						<DropdownMenuTrigger
							className={triggerClassName}
							onMouseEnter={() => handleTriggerHover("view")}
						>
							View
						</DropdownMenuTrigger>
						<DropdownMenuContent
							className={contentClassName}
							sideOffset={4}
							align="start"
						>
							<DropdownMenuItem
								className="text-[13px] px-2.5 py-1.5 rounded flex items-center justify-between cursor-default"
								onSelect={toggleTheme}
							>
								<span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
								{theme === "dark" ? (
									<Sun className="h-3.5 w-3.5 ml-4 text-muted-foreground" />
								) : (
									<Moon className="h-3.5 w-3.5 ml-4 text-muted-foreground" />
								)}
							</DropdownMenuItem>
							<DropdownMenuSeparator className="my-1" />
							<MenuItem disabled>Show Sidebar</MenuItem>
							<MenuItem disabled>Show Inspector</MenuItem>
						</DropdownMenuContent>
					</DropdownMenu>

					{/* Settings Menu */}
					<DropdownMenu
						modal={false}
						open={activeMenu === "settings"}
						onOpenChange={(open) =>
							open ? handleMenuOpen("settings") : handleMenuClose()
						}
					>
						<DropdownMenuTrigger
							className={triggerClassName}
							onMouseEnter={() => handleTriggerHover("settings")}
						>
							Settings
						</DropdownMenuTrigger>
						<DropdownMenuContent
							className={contentClassName}
							sideOffset={4}
							align="start"
						>
							<MenuItem disabled>Preferences...</MenuItem>
							<MenuItem disabled>Data Management</MenuItem>
							<DropdownMenuSeparator className="my-1" />
							<MenuItem disabled>Export...</MenuItem>
							<MenuItem disabled>Import...</MenuItem>
						</DropdownMenuContent>
					</DropdownMenu>

					{/* Help Menu */}
					<DropdownMenu
						modal={false}
						open={activeMenu === "help"}
						onOpenChange={(open) =>
							open ? handleMenuOpen("help") : handleMenuClose()
						}
					>
						<DropdownMenuTrigger
							className={triggerClassName}
							onMouseEnter={() => handleTriggerHover("help")}
						>
							Help
						</DropdownMenuTrigger>
						<DropdownMenuContent
							className={contentClassName}
							sideOffset={4}
							align="start"
						>
							<MenuItem disabled>CORE Help</MenuItem>
							<DropdownMenuSeparator className="my-1" />
							<MenuItem disabled>What's New</MenuItem>
							<MenuItem disabled>About CORE</MenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
		</nav>
	);
}
