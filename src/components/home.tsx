import React from "react";
import Sidebar from "./Sidebar";
import ComponentSection from "./ComponentSection";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card } from "./ui/card";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Calendar } from "./ui/calendar";
import { Progress } from "./ui/progress";
import { Skeleton } from "./ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./ui/navigation-menu";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./ui/resizable";
import { ScrollArea } from "./ui/scroll-area";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Toaster } from "./ui/toaster";
import { useToast } from "./ui/use-toast";
import { Combobox } from "@/components/ui/combobox";
import { Separator } from "./ui/separator";
import { AspectRatio } from "./ui/aspect-ratio";
import { Checkbox } from "./ui/checkbox";
import {
  AlertCircle,
  Info,
  Settings,
  GripVertical,
  Search,
  CreditCard,
  User,
  Mail,
  MessageSquare,
  PlusCircle,
  Github,
  LifeBuoy,
  Cloud,
  Laptop,
  ChevronDown,
  PanelLeftOpen,
  PanelRightOpen,
  Upload,
  Check,
  Image as ImageIcon,
} from "lucide-react";

const Home = () => {
  const [count, setCount] = React.useState(0);
  const [text, setText] = React.useState("");
  const [theme, setTheme] = React.useState("light");
  const [date, setDate] = React.useState<Date>();
  const [progress, setProgress] = React.useState(0);
  const [isPaused, setIsPaused] = React.useState(false);
  const progressInterval = React.useRef<number>();
  const [dragging, setDragging] = React.useState<string | null>(null);
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  const startProgress = React.useCallback(() => {
    if (!isPaused) {
      progressInterval.current = window.setInterval(() => {
        setProgress((p) => (p + 1) % 101);
      }, 100);
    }
  }, [isPaused]);

  const pauseProgress = React.useCallback(() => {
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
      progressInterval.current = undefined;
    }
  }, []);

  React.useEffect(() => {
    if (isPaused) {
      pauseProgress();
    } else {
      startProgress();
    }
    return () => pauseProgress();
  }, [isPaused, startProgress, pauseProgress]);

  React.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  React.useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  const handleDragStart = (e: React.DragEvent, id: string) => {
    setDragging(id);
    e.dataTransfer.setData("text/plain", id);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    setDragging(null);
    alert(
      `Dropped item ${e.dataTransfer.getData("text/plain")} onto ${targetId}`,
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <main className="pl-[280px] p-8">
        <div className="max-w-5xl mx-auto space-y-12">
          <section id="buttons">
            <ComponentSection
              title="Buttons"
              description="Various button styles and variants for different actions"
              code={`<Button onClick={() => setCount(c => c + 1)}>Count: {count}</Button>`}
            >
              <div className="space-y-8">
                <div className="flex gap-4 flex-wrap">
                  <Button onClick={() => setCount((c) => c + 1)}>
                    Count: {count}
                  </Button>
                  <Button variant="destructive" onClick={() => setText("")}>
                    Clear Text
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() =>
                      setTheme((t) => (t === "light" ? "dark" : "light"))
                    }
                  >
                    {theme === "light" ? "Dark" : "Light"} Mode
                  </Button>
                </div>
              </div>
            </ComponentSection>
          </section>

          <section id="inputs">
            <ComponentSection
              title="Form Inputs"
              description="Text inputs and form controls"
              code={`<Input value={text} onChange={(e) => setText(e.target.value)} />`}
            >
              <div className="space-y-4">
                <Input
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Type something..."
                />
                <p className="text-muted-foreground">
                  Current text: {text || "(empty)"}
                </p>
              </div>
            </ComponentSection>
          </section>

          <section id="cards">
            <ComponentSection
              title="Cards"
              description="Draggable card components"
              code={`<Card className="p-6 cursor-move">`}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {["card1", "card2"].map((cardId) => (
                  <Card
                    key={cardId}
                    draggable
                    onDragStart={(e) => handleDragStart(e, cardId)}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, cardId)}
                    className={`p-6 cursor-move transition-all hover:scale-105 ${dragging === cardId ? "opacity-50" : ""}`}
                  >
                    <div className="flex items-center gap-2">
                      <GripVertical className="h-5 w-5" />
                      <h3 className="text-lg font-semibold">Card {cardId}</h3>
                    </div>
                  </Card>
                ))}
              </div>
            </ComponentSection>
          </section>

          <section id="alerts">
            <ComponentSection
              title="Alerts"
              description="Alert and notification components"
              code={`<Alert><AlertTitle>Note</AlertTitle><AlertDescription>This is an alert.</AlertDescription></Alert>`}
            >
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Note</AlertTitle>
                <AlertDescription>
                  This is an important alert message.
                </AlertDescription>
              </Alert>
            </ComponentSection>
          </section>

          <section id="modals">
            <ComponentSection
              title="Modals"
              description="Dialog and modal components"
              code={`<Dialog><DialogTrigger>Open</DialogTrigger><DialogContent>Content</DialogContent></Dialog>`}
            >
              <Dialog>
                <DialogTrigger asChild>
                  <Button>Open Dialog</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Dialog Title</DialogTitle>
                  </DialogHeader>
                  <div className="py-4">Dialog content goes here</div>
                </DialogContent>
              </Dialog>
            </ComponentSection>
          </section>

          <section id="navigation">
            <ComponentSection
              title="Navigation"
              description="Navigation menu components"
              code={`<NavigationMenu />`}
            >
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="p-4 w-[200px]">
                        <p>Navigation content</p>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </ComponentSection>
          </section>

          <section id="dropdown">
            <ComponentSection
              title="Dropdown"
              description="Dropdown menu components"
              code={`<DropdownMenu />`}
            >
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">Open Menu</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Item 1</DropdownMenuItem>
                  <DropdownMenuItem>Item 2</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </ComponentSection>
          </section>

          <section id="calendar">
            <ComponentSection
              title="Calendar"
              description="Date picker calendar"
              code={`<Calendar selected={date} onSelect={setDate} />`}
            >
              <div className="space-y-4">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border"
                />
                <p className="text-sm text-muted-foreground text-center">
                  Selected date: {date ? date.toLocaleDateString() : "None"}
                </p>
              </div>
            </ComponentSection>
          </section>

          <section id="progress">
            <ComponentSection
              title="Progress"
              description="Progress indicator"
              code={`<Progress value={progress} />`}
            >
              <div className="space-y-4">
                <Progress value={progress} className="h-2" />
                <p className="text-sm text-muted-foreground text-center">
                  {progress}% Complete
                </p>
                <div className="flex justify-center gap-4">
                  <Button
                    variant="outline"
                    onClick={() => setIsPaused(!isPaused)}
                  >
                    {isPaused ? "Resume" : "Pause"}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      pauseProgress();
                      setProgress(0);
                      setIsPaused(false);
                      startProgress();
                    }}
                  >
                    Reset
                  </Button>
                </div>
              </div>
            </ComponentSection>
          </section>

          <section id="command">
            <ComponentSection
              title="Command"
              description="Command palette interface"
              code={`<CommandDialog open={open} onOpenChange={setOpen}>`}
            >
              <Button
                onClick={() => setOpen(true)}
                className="w-[200px] justify-start text-sm text-muted-foreground"
              >
                <Search className="mr-2 h-4 w-4" />
                Search commands...
              </Button>
              <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput placeholder="Type a command or search..." />
                <CommandList>
                  <CommandEmpty>No results found.</CommandEmpty>
                  <CommandGroup heading="Suggestions">
                    <CommandItem>
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </CommandItem>
                    <CommandItem>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </CommandItem>
                  </CommandGroup>
                </CommandList>
              </CommandDialog>
            </ComponentSection>
          </section>

          <section id="skeleton">
            <ComponentSection
              title="Skeleton"
              description="Loading state placeholder"
              code={`<Skeleton className="h-12 w-12 rounded-full" />`}
            >
              <div className="flex items-center space-x-4">
                {loading ? (
                  <>
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-[250px]" />
                      <Skeleton className="h-4 w-[200px]" />
                    </div>
                  </>
                ) : (
                  <>
                    <Avatar>
                      <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=1" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div className="space-y-2">
                      <h3 className="font-medium">John Doe</h3>
                      <p className="text-sm text-muted-foreground">
                        Software Engineer
                      </p>
                    </div>
                  </>
                )}
              </div>
            </ComponentSection>
          </section>

          <section id="carousel">
            <ComponentSection
              title="Carousel"
              description="Slideshow component"
              code={`<Carousel><CarouselContent><CarouselItem>Slide</CarouselItem></CarouselContent></Carousel>`}
            >
              <Carousel className="w-full max-w-xs mx-auto">
                <CarouselContent>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <CarouselItem key={index}>
                      <Card className="p-6">
                        <h4 className="font-semibold">Slide {index + 1}</h4>
                        <p className="text-sm text-muted-foreground">
                          Carousel item {index + 1}
                        </p>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </ComponentSection>
          </section>

          <section id="tabs">
            <ComponentSection
              title="Tabs"
              description="Tabbed interface"
              code={`<Tabs defaultValue="account"><TabsList><TabsTrigger>Tab</TabsTrigger></TabsList></Tabs>`}
            >
              <Tabs defaultValue="account" className="w-[400px] mx-auto">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="account">Account</TabsTrigger>
                  <TabsTrigger value="password">Password</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>
                <TabsContent value="account" className="space-y-4">
                  <div className="space-y-4">
                    <h4 className="font-medium">Account</h4>
                    <Input placeholder="Email" />
                  </div>
                </TabsContent>
                <TabsContent value="password" className="space-y-4">
                  <div className="space-y-4">
                    <h4 className="font-medium">Password</h4>
                    <Input type="password" placeholder="New password" />
                  </div>
                </TabsContent>
                <TabsContent value="settings" className="space-y-4">
                  <div className="space-y-4">
                    <h4 className="font-medium">Settings</h4>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">Account Settings</Badge>
                      <Badge variant="outline">User Preferences</Badge>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </ComponentSection>
          </section>

          <section id="hover-card">
            <ComponentSection
              title="Hover Card"
              description="Card that appears when hovering over a trigger"
              code={`<HoverCard><HoverCardTrigger /><HoverCardContent /></HoverCard>`}
            >
              <div className="flex items-center justify-center">
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <Button variant="link" className="text-lg">
                      @username
                    </Button>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80">
                    <div className="flex justify-between space-x-4">
                      <Avatar>
                        <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=2" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <h4 className="text-sm font-semibold">@username</h4>
                        <p className="text-sm text-muted-foreground">
                          Staff Software Engineer at Company
                        </p>
                        <div className="flex items-center pt-2">
                          <Github className="mr-2 h-4 w-4" />
                          <span className="text-xs text-muted-foreground">
                            Joined December 2021
                          </span>
                        </div>
                      </div>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              </div>
            </ComponentSection>
          </section>

          <section id="sheet">
            <ComponentSection
              title="Sheet"
              description="Slides in from the edge of the screen"
              code={`<Sheet><SheetTrigger /><SheetContent /></Sheet>`}
            >
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline">Open Settings</Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Settings</SheetTitle>
                    <SheetDescription>
                      Configure your app preferences here.
                    </SheetDescription>
                  </SheetHeader>
                  <div className="grid gap-4 py-4">
                    <div className="flex items-center space-x-4">
                      <Switch id="airplane-mode" />
                      <Label htmlFor="airplane-mode">Airplane Mode</Label>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Switch id="notifications" />
                      <Label htmlFor="notifications">Notifications</Label>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </ComponentSection>
          </section>

          <section id="collapsible">
            <ComponentSection
              title="Collapsible"
              description="Content that can be collapsed and expanded"
              code={`<Collapsible><CollapsibleTrigger /><CollapsibleContent /></Collapsible>`}
            >
              <Collapsible
                open={!isCollapsed}
                onOpenChange={(open) => setIsCollapsed(!open)}
                className="w-[350px] space-y-2"
              >
                <div className="flex items-center justify-between space-x-4 px-4">
                  <h4 className="text-sm font-semibold">Notifications</h4>
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <ChevronDown className="h-4 w-4" />
                      {isCollapsed ? "Show" : "Hide"}
                    </Button>
                  </CollapsibleTrigger>
                </div>
                <CollapsibleContent className="space-y-2">
                  <div className="rounded-md border px-4 py-2 font-mono text-sm">
                    You have a new message
                  </div>
                  <div className="rounded-md border px-4 py-2 font-mono text-sm">
                    Your subscription is expiring
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </ComponentSection>
          </section>

          <section id="resizable">
            <ComponentSection
              title="Resizable Panels"
              description="Panels that can be resized by dragging"
              code={`<ResizablePanelGroup><ResizablePanel /><ResizableHandle /><ResizablePanel /></ResizablePanelGroup>`}
            >
              <ResizablePanelGroup
                direction="horizontal"
                className="min-h-[200px] max-w-md rounded-lg border"
              >
                <ResizablePanel defaultSize={25}>
                  <div className="flex h-full items-center justify-center p-6">
                    <PanelLeftOpen className="h-4 w-4" />
                  </div>
                </ResizablePanel>
                <ResizableHandle />
                <ResizablePanel defaultSize={75}>
                  <ScrollArea className="h-full">
                    <div className="flex h-full items-center justify-center p-6">
                      <div className="space-y-2">
                        <h4 className="font-medium">Content Panel</h4>
                        <p className="text-sm text-muted-foreground">
                          Resize panels by dragging the handle.
                        </p>
                      </div>
                    </div>
                  </ScrollArea>
                </ResizablePanel>
              </ResizablePanelGroup>
            </ComponentSection>
          </section>

          <section id="table">
            <ComponentSection
              title="Data Table"
              description="Advanced table with sorting and selection"
              code={`<Table><TableHeader>...</TableHeader><TableBody>...</TableBody></Table>`}
            >
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50px]">
                        <Checkbox />
                      </TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      { name: "Project A", status: "Active" },
                      { name: "Project B", status: "Pending" },
                      { name: "Project C", status: "Completed" },
                    ].map((row) => (
                      <TableRow key={row.name}>
                        <TableCell>
                          <Checkbox />
                        </TableCell>
                        <TableCell className="font-medium">
                          {row.name}
                        </TableCell>
                        <TableCell>{row.status}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            Edit
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </ComponentSection>
          </section>

          <section id="upload">
            <ComponentSection
              title="File Upload Zone"
              description="Drag and drop file upload area"
              code={`<div className="border-2 border-dashed rounded-lg p-12 text-center hover:bg-accent">`}
            >
              <div
                className="border-2 border-dashed rounded-lg p-12 text-center hover:bg-accent cursor-pointer"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  const files = Array.from(e.dataTransfer.files);
                  console.log("Dropped files:", files);
                }}
              >
                <div className="space-y-4">
                  <Upload className="w-12 h-12 mx-auto text-muted-foreground" />
                  <div>
                    <p className="text-lg font-medium">
                      Drop files here or click to upload
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Support for images, videos, and documents
                    </p>
                  </div>
                </div>
              </div>
            </ComponentSection>
          </section>

          <section id="toast">
            <ComponentSection
              title="Toast Notifications"
              description="Pop-up notifications system"
              code={`useToast().toast({ title: "Success", description: "Action completed" })`}
            >
              <div className="space-y-2">
                <Button
                  onClick={() => {
                    useToast().toast({
                      title: "Success!",
                      description: "Your action has been completed.",
                    });
                  }}
                >
                  Show Toast
                </Button>
              </div>
              <Toaster />
            </ComponentSection>
          </section>

          <section id="combobox">
            <ComponentSection
              title="Combobox"
              description="Searchable dropdown with autocomplete"
              code={`<Combobox items={[...]} />`}
            >
              <div className="w-[200px]">
                <Combobox
                  items={[
                    { label: "Option 1", value: "1" },
                    { label: "Option 2", value: "2" },
                    { label: "Option 3", value: "3" },
                  ]}
                  placeholder="Select an option..."
                />
              </div>
            </ComponentSection>
          </section>

          <section id="aspect-ratio">
            <ComponentSection
              title="Aspect Ratio Box"
              description="Maintain aspect ratio for responsive content"
              code={`<AspectRatio ratio={16/9}><img /></AspectRatio>`}
            >
              <div className="w-[400px] mx-auto">
                <AspectRatio
                  ratio={16 / 9}
                  className="bg-muted rounded-lg overflow-hidden"
                >
                  <img
                    src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
                    alt="Photo"
                    className="object-cover w-full h-full"
                  />
                </AspectRatio>
                <p className="text-sm text-muted-foreground text-center mt-2">
                  16:9 Aspect Ratio
                </p>
              </div>
            </ComponentSection>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Home;
