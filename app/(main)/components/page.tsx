"use client"

import * as React from "react"
import {
  Mail, Download, Trash2, Plus, Search, Eye, EyeOff,
  Lock, AlertCircle, CheckCircle, Info, Terminal, ChevronRight,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { Progress } from "@/components/ui/progress"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem, SelectGroup, SelectLabel } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Dialog, DialogTrigger, DialogContent, DialogHeader,
  DialogTitle, DialogDescription, DialogFooter, DialogClose,
} from "@/components/ui/dialog"
import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent,
  DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import {
  Table, TableHeader, TableBody, TableRow,
  TableHead, TableCell, TableFooter, TableCaption,
} from "@/components/ui/table"

/* ── Section wrapper ──────────────────────────────────────── */
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-3">
      <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground border-b border-border pb-2">
        {title}
      </h2>
      {children}
    </section>
  )
}

function Row({ label, children }: { label?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      {label && <p className="text-[10px] text-muted-foreground font-medium">{label}</p>}
      <div className="flex flex-wrap items-center gap-2">{children}</div>
    </div>
  )
}

/* ── Page ─────────────────────────────────────────────────── */
export default function ComponentsPage() {
  const [showPwd, setShowPwd] = React.useState(false)
  const [sliderVal, setSliderVal] = React.useState([40])
  const [radioVal, setRadioVal] = React.useState("b")

  const tableRows = [
    { inv: "INV-001", name: "Alice Johnson", role: "Admin",   status: "Paid",    amount: "$250.00" },
    { inv: "INV-002", name: "Bob Smith",     role: "User",    status: "Pending", amount: "$150.00" },
    { inv: "INV-003", name: "Carol White",   role: "Editor",  status: "Unpaid",  amount: "$350.00" },
    { inv: "INV-004", name: "David Lee",     role: "User",    status: "Paid",    amount: "$450.00" },
  ]
  const statusVariant: Record<string, "default" | "secondary" | "destructive"> = {
    Paid: "default", Pending: "secondary", Unpaid: "destructive",
  }

  return (
    <div className="max-w-4xl space-y-10 p-8">

      {/* ── BUTTONS ───────────────────────────────────────── */}
      <Section title="Buttons">
        <Row label="Variants">
          <Button variant="default">Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="link">Link</Button>
        </Row>
        <Row label="Sizes">
          <Button size="xs">Extra Small</Button>
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
          <Button size="icon"><Plus /></Button>
          <Button size="icon-sm"><Plus /></Button>
          <Button size="icon-lg"><Plus /></Button>
        </Row>
        <Row label="With icons">
          <Button><Mail className="size-3.5" /> Send Email</Button>
          <Button variant="outline"><Download className="size-3.5" /> Export</Button>
          <Button variant="destructive"><Trash2 className="size-3.5" /> Delete</Button>
          <Button variant="secondary"><Plus className="size-3.5" /> Create</Button>
        </Row>
        <Row label="States">
          <Button disabled>Disabled</Button>
          <Button variant="outline" disabled>Outline disabled</Button>
          <Button variant="destructive" disabled>Destructive disabled</Button>
        </Row>
      </Section>

      <Separator />

      {/* ── BADGES ────────────────────────────────────────── */}
      <Section title="Badges">
        <Row label="Variants">
          <Badge variant="default">Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="ghost">Ghost</Badge>
        </Row>
      </Section>

      <Separator />

      {/* ── ALERTS ────────────────────────────────────────── */}
      <Section title="Alerts">
        <Alert>
          <Info />
          <AlertTitle>Info</AlertTitle>
          <AlertDescription>You can add components to your app using the CLI.</AlertDescription>
        </Alert>
        <Alert variant="destructive">
          <AlertCircle />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>Your session has expired. Please log in again.</AlertDescription>
        </Alert>
        <Alert className="border-green-200 bg-green-50 text-green-800 dark:border-green-800 dark:bg-green-950 dark:text-green-200">
          <CheckCircle />
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>Your changes have been saved successfully.</AlertDescription>
        </Alert>
        <Alert className="border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-200">
          <Terminal />
          <AlertTitle>Warning</AlertTitle>
          <AlertDescription>This action cannot be undone. Proceed with caution.</AlertDescription>
        </Alert>
      </Section>

      <Separator />

      {/* ── INPUT FIELDS ──────────────────────────────────── */}
      <Section title="Input Fields">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="i-text">Default text</Label>
            <Input id="i-text" placeholder="Enter text…" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="i-email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
              <Input id="i-email" type="email" placeholder="you@example.com" className="pl-8" />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="i-pwd">Password</Label>
            <div className="relative">
              <Lock className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
              <Input
                id="i-pwd"
                type={showPwd ? "text" : "password"}
                placeholder="••••••••"
                className="pl-8 pr-8"
              />
              <button
                type="button"
                onClick={() => setShowPwd(!showPwd)}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPwd ? <EyeOff className="size-3.5" /> : <Eye className="size-3.5" />}
              </button>
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="i-search">Search</Label>
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
              <Input id="i-search" placeholder="Search…" className="pl-8" />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="i-num">Number</Label>
            <Input id="i-num" type="number" placeholder="0" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="i-date">Date</Label>
            <Input id="i-date" type="date" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="i-disabled">Disabled</Label>
            <Input id="i-disabled" placeholder="Cannot edit" disabled />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="i-readonly">Read-only</Label>
            <Input id="i-readonly" defaultValue="Read only value" readOnly />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="i-file">File</Label>
            <Input id="i-file" type="file" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="i-color">Color</Label>
            <Input id="i-color" type="color" className="h-7 cursor-pointer px-1" />
          </div>
          <div className="space-y-1.5 sm:col-span-2">
            <Label htmlFor="i-ta">Textarea</Label>
            <Textarea id="i-ta" placeholder="Type your message here…" rows={3} />
          </div>
          <div className="space-y-1.5 sm:col-span-2">
            <Label htmlFor="i-ta-dis">Textarea disabled</Label>
            <Textarea id="i-ta-dis" placeholder="Cannot edit" disabled rows={2} />
          </div>
        </div>
      </Section>

      <Separator />

      {/* ── SELECT ────────────────────────────────────────── */}
      <Section title="Select">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label>Default size</Label>
            <Select>
              <SelectTrigger><SelectValue placeholder="Select a fruit" /></SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Fruits</SelectLabel>
                  <SelectItem value="apple">Apple</SelectItem>
                  <SelectItem value="banana">Banana</SelectItem>
                  <SelectItem value="mango">Mango</SelectItem>
                </SelectGroup>
                <SelectGroup>
                  <SelectLabel>Vegetables</SelectLabel>
                  <SelectItem value="carrot">Carrot</SelectItem>
                  <SelectItem value="potato">Potato</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label>Small size</Label>
            <Select>
              <SelectTrigger size="sm"><SelectValue placeholder="Select size" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="xs">Extra Small</SelectItem>
                <SelectItem value="sm">Small</SelectItem>
                <SelectItem value="md">Medium</SelectItem>
                <SelectItem value="lg">Large</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Section>

      <Separator />

      {/* ── CHECKBOX ──────────────────────────────────────── */}
      <Section title="Checkbox">
        <Row label="States">
          <div className="flex items-center gap-2">
            <Checkbox id="cb1" defaultChecked />
            <Label htmlFor="cb1" className="font-normal">Checked</Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="cb2" />
            <Label htmlFor="cb2" className="font-normal">Unchecked</Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="cb3" disabled />
            <Label htmlFor="cb3" className="font-normal text-muted-foreground">Disabled</Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="cb4" disabled defaultChecked />
            <Label htmlFor="cb4" className="font-normal text-muted-foreground">Disabled checked</Label>
          </div>
        </Row>
      </Section>

      <Separator />

      {/* ── RADIO GROUP ───────────────────────────────────── */}
      <Section title="Radio Group">
        <RadioGroup value={radioVal} onValueChange={setRadioVal} className="flex flex-wrap gap-4">
          {[
            { value: "a", label: "Option A" },
            { value: "b", label: "Option B" },
            { value: "c", label: "Option C" },
            { value: "d", label: "Disabled", disabled: true },
          ].map(({ value, label, disabled }) => (
            <div key={value} className="flex items-center gap-2">
              <RadioGroupItem value={value} id={`r-${value}`} disabled={disabled} />
              <Label htmlFor={`r-${value}`} className={`font-normal ${disabled ? "text-muted-foreground" : ""}`}>{label}</Label>
            </div>
          ))}
        </RadioGroup>
        <p className="text-[10px] text-muted-foreground">Selected: {radioVal}</p>
      </Section>

      <Separator />

      {/* ── SWITCH ────────────────────────────────────────── */}
      <Section title="Switch">
        <Row label="States">
          <div className="flex items-center gap-2">
            <Switch id="sw1" defaultChecked />
            <Label htmlFor="sw1" className="font-normal">On</Label>
          </div>
          <div className="flex items-center gap-2">
            <Switch id="sw2" />
            <Label htmlFor="sw2" className="font-normal">Off</Label>
          </div>
          <div className="flex items-center gap-2">
            <Switch id="sw3" disabled />
            <Label htmlFor="sw3" className="font-normal text-muted-foreground">Disabled off</Label>
          </div>
          <div className="flex items-center gap-2">
            <Switch id="sw4" disabled defaultChecked />
            <Label htmlFor="sw4" className="font-normal text-muted-foreground">Disabled on</Label>
          </div>
        </Row>
      </Section>

      <Separator />

      {/* ── SLIDER ────────────────────────────────────────── */}
      <Section title="Slider">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <Label>Default</Label>
              <span className="text-muted-foreground">{sliderVal[0]}%</span>
            </div>
            <Slider value={sliderVal} onValueChange={setSliderVal} />
          </div>
          <div className="space-y-2">
            <Label className="text-xs">Disabled</Label>
            <Slider defaultValue={[60]} disabled />
          </div>
        </div>
      </Section>

      <Separator />

      {/* ── PROGRESS ──────────────────────────────────────── */}
      <Section title="Progress">
        <div className="space-y-3">
          {[10, 35, 65, 90].map(v => (
            <div key={v} className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground w-8 shrink-0">{v}%</span>
              <Progress value={v} className="flex-1" />
            </div>
          ))}
        </div>
      </Section>

      <Separator />

      {/* ── AVATAR ────────────────────────────────────────── */}
      <Section title="Avatar">
        <Row label="Sizes">
          {[
            { cls: "size-6", fb: "text-[9px]", label: "6" },
            { cls: "size-8", fb: "text-xs",    label: "8" },
            { cls: "size-10", fb: "text-sm",   label: "10" },
            { cls: "size-12", fb: "text-base", label: "12" },
            { cls: "size-14", fb: "text-lg",   label: "14" },
          ].map(({ cls, fb, label }) => (
            <div key={label} className="flex flex-col items-center gap-1">
              <Avatar className={cls}>
                <AvatarFallback className={fb}>JD</AvatarFallback>
              </Avatar>
              <span className="text-[9px] text-muted-foreground">{label}</span>
            </div>
          ))}
        </Row>
        <Row label="Stacked group">
          <div className="flex -space-x-2">
            {["AB", "CD", "EF", "GH"].map(i => (
              <Avatar key={i} className="size-8 ring-2 ring-background">
                <AvatarFallback className="text-xs">{i}</AvatarFallback>
              </Avatar>
            ))}
            <div className="flex size-8 items-center justify-center rounded-full ring-2 ring-background bg-muted text-muted-foreground text-xs font-medium">
              +5
            </div>
          </div>
        </Row>
      </Section>

      <Separator />

      {/* ── DIALOG ────────────────────────────────────────── */}
      <Section title="Dialog">
        <Row label="Variants">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">Basic dialog</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Basic Dialog</DialogTitle>
                <DialogDescription>A simple dialog with a title, description, and action buttons.</DialogDescription>
              </DialogHeader>
              <p className="text-xs text-muted-foreground">Dialog body content goes here.</p>
              <DialogFooter>
                <DialogClose asChild><Button variant="outline" size="sm">Cancel</Button></DialogClose>
                <Button size="sm">Confirm</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm">Form dialog</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create User</DialogTitle>
                <DialogDescription>Fill in the details to create a new account.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-3">
                <div className="space-y-1"><Label>Full name</Label><Input placeholder="John Doe" /></div>
                <div className="space-y-1"><Label>Email</Label><Input type="email" placeholder="john@example.com" /></div>
                <div className="space-y-1">
                  <Label>Role</Label>
                  <Select>
                    <SelectTrigger><SelectValue placeholder="Select role" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="user">User</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild><Button variant="outline" size="sm">Cancel</Button></DialogClose>
                <Button size="sm">Create</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="destructive" size="sm">Destructive dialog</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription>This action cannot be undone. This will permanently delete the account.</DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild><Button variant="outline" size="sm">Cancel</Button></DialogClose>
                <Button variant="destructive" size="sm">Delete Account</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </Row>
      </Section>

      <Separator />

      {/* ── DROPDOWN ──────────────────────────────────────── */}
      <Section title="Dropdown Menu">
        <Row>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">Open menu <ChevronRight className="size-3.5" /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-44">
              <DropdownMenuLabel className="text-xs">My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-xs">Profile</DropdownMenuItem>
              <DropdownMenuItem className="text-xs">Settings</DropdownMenuItem>
              <DropdownMenuItem className="text-xs">Billing</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-xs text-destructive">Sign out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </Row>
      </Section>

      <Separator />

      {/* ── TABS ──────────────────────────────────────────── */}
      <Section title="Tabs">
        <Tabs defaultValue="tab1">
          <TabsList>
            <TabsTrigger value="tab1">Account</TabsTrigger>
            <TabsTrigger value="tab2">Password</TabsTrigger>
            <TabsTrigger value="tab3">Notifications</TabsTrigger>
            <TabsTrigger value="tab4" disabled>Billing</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">
            <Card size="sm"><CardContent className="pt-3 text-xs text-muted-foreground">Account settings panel.</CardContent></Card>
          </TabsContent>
          <TabsContent value="tab2">
            <Card size="sm"><CardContent className="pt-3 text-xs text-muted-foreground">Change your password and security settings.</CardContent></Card>
          </TabsContent>
          <TabsContent value="tab3">
            <Card size="sm"><CardContent className="pt-3 text-xs text-muted-foreground">Configure how and when you receive notifications.</CardContent></Card>
          </TabsContent>
        </Tabs>
      </Section>

      <Separator />

      {/* ── CARDS ─────────────────────────────────────────── */}
      <Section title="Cards">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Default Card</CardTitle>
              <CardDescription>Header, content, and footer</CardDescription>
            </CardHeader>
            <CardContent><p className="text-xs text-muted-foreground">Card body content goes here with some descriptive text.</p></CardContent>
            <CardFooter className="gap-2">
              <Button size="sm">Action</Button>
              <Button size="sm" variant="outline">Cancel</Button>
            </CardFooter>
          </Card>

          <Card size="sm">
            <CardHeader>
              <CardTitle>Small Card</CardTitle>
              <CardDescription>Compact variant with tighter padding</CardDescription>
            </CardHeader>
            <CardContent><p className="text-xs text-muted-foreground">Tighter spacing for dense layouts.</p></CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>With Badge</CardTitle>
                <Badge>New</Badge>
              </div>
              <CardDescription>Card with badge in header</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">$45,231</p>
              <p className="text-xs text-muted-foreground mt-0.5">+20.1% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4 flex items-center gap-3">
              <Avatar className="size-10"><AvatarFallback>JD</AvatarFallback></Avatar>
              <div>
                <p className="text-xs font-medium">Jane Doe</p>
                <p className="text-[10px] text-muted-foreground">jane@example.com</p>
                <Badge variant="secondary" className="mt-1">Admin</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Notifications</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              {["Server restarted", "New user signed up", "Backup completed"].map(n => (
                <div key={n} className="flex items-center gap-2 text-xs">
                  <div className="size-1.5 rounded-full bg-primary shrink-0" />{n}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </Section>

      <Separator />

      {/* ── TABLE ─────────────────────────────────────────── */}
      <Section title="Table">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div><CardTitle>Users</CardTitle><CardDescription>Recent user list.</CardDescription></div>
              <Button size="sm"><Plus className="size-3.5" /> Add User</Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableCaption>End of list.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tableRows.map(({ inv, name, role, status, amount }) => (
                  <TableRow key={inv}>
                    <TableCell className="font-mono text-muted-foreground">{inv}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="size-6"><AvatarFallback className="text-[9px]">{name.split(" ").map(n => n[0]).join("")}</AvatarFallback></Avatar>
                        {name}
                      </div>
                    </TableCell>
                    <TableCell>{role}</TableCell>
                    <TableCell><Badge variant={statusVariant[status]}>{status}</Badge></TableCell>
                    <TableCell className="text-right font-medium">{amount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={4} className="font-medium">Total</TableCell>
                  <TableCell className="text-right font-medium">$1,200.00</TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </CardContent>
        </Card>
      </Section>

      <Separator />

      {/* ── SEPARATOR ─────────────────────────────────────── */}
      <Section title="Separator">
        <div className="space-y-3">
          <div className="space-y-2">
            <p className="text-xs">Horizontal</p>
            <Separator />
          </div>
          <div className="flex items-center gap-4 h-6">
            <span className="text-xs">Left</span>
            <Separator orientation="vertical" />
            <span className="text-xs">Middle</span>
            <Separator orientation="vertical" />
            <span className="text-xs">Right</span>
          </div>
        </div>
      </Section>

    </div>
  )
}
