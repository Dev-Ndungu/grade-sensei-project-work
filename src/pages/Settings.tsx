
import React, { useState } from "react";
import { NavBar } from "@/components/NavBar";
import { Container } from "@/components/ui/container";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  User,
  School,
  Bell,
  Shield,
  Lock,
  Users,
  BookOpen,
  Save,
  Plus,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";

const Settings = () => {
  const [schoolName, setSchoolName] = useState("Nairobi Secondary School");
  const [schoolAddress, setSchoolAddress] = useState("123 Education Lane, Nairobi");
  const [schoolEmail, setSchoolEmail] = useState("admin@nairobisecondary.edu");
  const [schoolPhone, setSchoolPhone] = useState("+254 123 456 789");
  const [gradeScale, setGradeScale] = useState([
    { min: 80, max: 100, grade: "A", comment: "Excellent" },
    { min: 70, max: 79, grade: "B", comment: "Good" },
    { min: 60, max: 69, grade: "C", comment: "Average" },
    { min: 50, max: 59, grade: "D", comment: "Below Average" },
    { min: 0, max: 49, grade: "E", comment: "Poor" },
  ]);

  const handleSchoolInfoSave = () => {
    toast.success("School information updated successfully");
  };

  const handleGradeScaleSave = () => {
    toast.success("Grade scale updated successfully");
  };

  const addGradeLevel = () => {
    setGradeScale([...gradeScale, { min: 0, max: 0, grade: "", comment: "" }]);
  };

  const removeGradeLevel = (index: number) => {
    setGradeScale(gradeScale.filter((_, i) => i !== index));
  };

  const updateGradeLevel = (index: number, field: string, value: string | number) => {
    const newGradeScale = [...gradeScale];
    newGradeScale[index] = { ...newGradeScale[index], [field]: value };
    setGradeScale(newGradeScale);
  };

  return (
    <div className="min-h-screen pb-20">
      <NavBar />
      <div className="pt-24 pb-16">
        <Container>
          <div className="mb-8 animate-slide-down">
            <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
            <p className="text-muted-foreground">
              Configure your school profile and system preferences
            </p>
          </div>

          <Tabs defaultValue="profile" className="space-y-8">
            <TabsList className="grid w-full md:w-auto grid-cols-2 md:grid-cols-4 gap-2">
              <TabsTrigger value="profile" className="gap-2">
                <School size={16} />
                School Profile
              </TabsTrigger>
              <TabsTrigger value="academics" className="gap-2">
                <BookOpen size={16} />
                Academic Settings
              </TabsTrigger>
              <TabsTrigger value="users" className="gap-2">
                <Users size={16} />
                User Management
              </TabsTrigger>
              <TabsTrigger value="security" className="gap-2">
                <Shield size={16} />
                Security
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="space-y-6 animate-fade-in">
              <Card>
                <CardHeader>
                  <CardTitle>School Information</CardTitle>
                  <CardDescription>
                    Update your school's basic information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="school-name">School Name</Label>
                      <Input
                        id="school-name"
                        value={schoolName}
                        onChange={(e) => setSchoolName(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="school-address">Address</Label>
                      <Input
                        id="school-address"
                        value={schoolAddress}
                        onChange={(e) => setSchoolAddress(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="school-email">Email</Label>
                      <Input
                        id="school-email"
                        type="email"
                        value={schoolEmail}
                        onChange={(e) => setSchoolEmail(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="school-phone">Phone</Label>
                      <Input
                        id="school-phone"
                        value={schoolPhone}
                        onChange={(e) => setSchoolPhone(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="school-logo">School Logo</Label>
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-muted rounded-md flex items-center justify-center">
                        <School size={32} className="text-muted-foreground" />
                      </div>
                      <Button variant="outline">Upload New Logo</Button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button className="gap-2" onClick={handleSchoolInfoSave}>
                    <Save size={16} />
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Regional Settings</CardTitle>
                  <CardDescription>Configure regional preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="timezone">Timezone</Label>
                      <Select defaultValue="africa-nairobi">
                        <SelectTrigger id="timezone">
                          <SelectValue placeholder="Select Timezone" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="africa-nairobi">
                            Africa/Nairobi (GMT+3)
                          </SelectItem>
                          <SelectItem value="africa-lagos">
                            Africa/Lagos (GMT+1)
                          </SelectItem>
                          <SelectItem value="africa-johannesburg">
                            Africa/Johannesburg (GMT+2)
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="date-format">Date Format</Label>
                      <Select defaultValue="dd-mm-yyyy">
                        <SelectTrigger id="date-format">
                          <SelectValue placeholder="Select Date Format" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="dd-mm-yyyy">DD/MM/YYYY</SelectItem>
                          <SelectItem value="mm-dd-yyyy">MM/DD/YYYY</SelectItem>
                          <SelectItem value="yyyy-mm-dd">YYYY/MM/DD</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button variant="outline" className="gap-2" onClick={() => toast.success("Regional settings saved")}>
                    <Save size={16} />
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="academics" className="space-y-6 animate-fade-in">
              <Card>
                <CardHeader>
                  <CardTitle>Grading System</CardTitle>
                  <CardDescription>Configure your school's grading scale</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Grade Scale Type</Label>
                        <p className="text-sm text-muted-foreground">
                          Choose how grades are calculated and displayed
                        </p>
                      </div>
                      <Select defaultValue="percentage">
                        <SelectTrigger className="w-[200px]">
                          <SelectValue placeholder="Select Grade Scale" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="percentage">Percentage (0-100%)</SelectItem>
                          <SelectItem value="letter">Letter Grades (A-F)</SelectItem>
                          <SelectItem value="gpa">GPA (0.0-4.0)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Separator />

                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-medium">Grade Levels</h3>
                        <Button
                          variant="outline"
                          size="sm"
                          className="gap-1"
                          onClick={addGradeLevel}
                        >
                          <Plus size={14} />
                          Add Level
                        </Button>
                      </div>

                      <div className="border rounded-lg overflow-hidden">
                        <table className="w-full">
                          <thead>
                            <tr className="bg-muted/50">
                              <th className="text-left py-2 px-4">Min Score</th>
                              <th className="text-left py-2 px-4">Max Score</th>
                              <th className="text-left py-2 px-4">Grade</th>
                              <th className="text-left py-2 px-4">Comment</th>
                              <th className="text-left py-2 px-4">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {gradeScale.map((level, index) => (
                              <tr key={index} className="border-t">
                                <td className="py-2 px-4">
                                  <Input
                                    type="number"
                                    min="0"
                                    max="100"
                                    value={level.min}
                                    onChange={(e) =>
                                      updateGradeLevel(
                                        index,
                                        "min",
                                        parseInt(e.target.value)
                                      )
                                    }
                                    className="w-20"
                                  />
                                </td>
                                <td className="py-2 px-4">
                                  <Input
                                    type="number"
                                    min="0"
                                    max="100"
                                    value={level.max}
                                    onChange={(e) =>
                                      updateGradeLevel(
                                        index,
                                        "max",
                                        parseInt(e.target.value)
                                      )
                                    }
                                    className="w-20"
                                  />
                                </td>
                                <td className="py-2 px-4">
                                  <Input
                                    value={level.grade}
                                    onChange={(e) =>
                                      updateGradeLevel(
                                        index,
                                        "grade",
                                        e.target.value
                                      )
                                    }
                                    className="w-20"
                                  />
                                </td>
                                <td className="py-2 px-4">
                                  <Input
                                    value={level.comment}
                                    onChange={(e) =>
                                      updateGradeLevel(
                                        index,
                                        "comment",
                                        e.target.value
                                      )
                                    }
                                  />
                                </td>
                                <td className="py-2 px-4">
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-destructive"
                                    onClick={() => removeGradeLevel(index)}
                                    disabled={gradeScale.length <= 1}
                                  >
                                    <Trash2 size={16} />
                                  </Button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button className="gap-2" onClick={handleGradeScaleSave}>
                    <Save size={16} />
                    Save Grading System
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Academic Calendar</CardTitle>
                  <CardDescription>Configure the school year and terms</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="current-year">Current Academic Year</Label>
                      <Select defaultValue="2023">
                        <SelectTrigger id="current-year">
                          <SelectValue placeholder="Select Academic Year" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="2022">2022</SelectItem>
                          <SelectItem value="2023">2023</SelectItem>
                          <SelectItem value="2024">2024</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="current-term">Current Term</Label>
                      <Select defaultValue="term2">
                        <SelectTrigger id="current-term">
                          <SelectValue placeholder="Select Term" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="term1">Term 1</SelectItem>
                          <SelectItem value="term2">Term 2</SelectItem>
                          <SelectItem value="term3">Term 3</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="auto-advance">
                        Automatically advance academic year/term
                      </Label>
                      <Switch id="auto-advance" defaultChecked />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      The system will automatically update the current academic year and term
                      based on the dates configured.
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button variant="outline" className="gap-2" onClick={() => toast.success("Academic calendar updated")}>
                    <Save size={16} />
                    Save Calendar Settings
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="users" className="space-y-6 animate-fade-in">
              <Card>
                <CardHeader>
                  <CardTitle>User Management</CardTitle>
                  <CardDescription>
                    Manage teachers, students, and administrator accounts
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-medium">System Users</h3>
                        <p className="text-sm text-muted-foreground">
                          Add or manage users with access to the system
                        </p>
                      </div>
                      <Button
                        onClick={() => toast("User management not available in demo")}
                      >
                        Add New User
                      </Button>
                    </div>

                    <div className="border rounded-lg overflow-hidden">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-muted/50">
                            <th className="text-left py-3 px-4">Name</th>
                            <th className="text-left py-3 px-4">Role</th>
                            <th className="text-left py-3 px-4">Email</th>
                            <th className="text-left py-3 px-4">Status</th>
                            <th className="text-left py-3 px-4">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[
                            {
                              id: 1,
                              name: "John Mutiso",
                              role: "Administrator",
                              email: "john.mutiso@nairobisecondary.edu",
                              status: "Active",
                            },
                            {
                              id: 2,
                              name: "Sarah Wanjiru",
                              role: "Teacher",
                              email: "sarah.wanjiru@nairobisecondary.edu",
                              status: "Active",
                            },
                            {
                              id: 3,
                              name: "Michael Omondi",
                              role: "Teacher",
                              email: "michael.omondi@nairobisecondary.edu",
                              status: "Active",
                            },
                            {
                              id: 4,
                              name: "Amina Hassan",
                              role: "Student",
                              email: "amina.hassan@nairobisecondary.edu",
                              status: "Active",
                            },
                            {
                              id: 5,
                              name: "David Ochieng",
                              role: "Student",
                              email: "david.ochieng@nairobisecondary.edu",
                              status: "Inactive",
                            },
                          ].map((user) => (
                            <tr key={user.id} className="border-t">
                              <td className="py-3 px-4">
                                <div className="flex items-center gap-2">
                                  <User size={16} className="text-muted-foreground" />
                                  {user.name}
                                </div>
                              </td>
                              <td className="py-3 px-4 text-muted-foreground">
                                {user.role}
                              </td>
                              <td className="py-3 px-4 text-muted-foreground">
                                {user.email}
                              </td>
                              <td className="py-3 px-4">
                                <span
                                  className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                                    user.status === "Active"
                                      ? "bg-green-50 text-green-700"
                                      : "bg-yellow-50 text-yellow-700"
                                  }`}
                                >
                                  {user.status}
                                </span>
                              </td>
                              <td className="py-3 px-4">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => toast("User editing not available in demo")}
                                >
                                  Edit
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t">
                  <div className="text-sm text-muted-foreground">
                    Showing 5 of 120 users
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Previous
                    </Button>
                    <Button variant="outline" size="sm">
                      Next
                    </Button>
                  </div>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Role Permissions</CardTitle>
                  <CardDescription>
                    Configure access levels for different user roles
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Administrator</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                          "Manage all users",
                          "Configure system settings",
                          "Generate all reports",
                          "View all grades",
                          "Edit grade scales",
                          "Audit system logs",
                        ].map((permission, i) => (
                          <div
                            key={i}
                            className="flex items-center space-x-2"
                          >
                            <Switch id={`admin-${i}`} defaultChecked />
                            <Label htmlFor={`admin-${i}`}>{permission}</Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Teacher</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                          "Enter grades for assigned classes",
                          "Generate student reports",
                          "View student profiles",
                          "Contact parents",
                          "Create assignments",
                          "View class performance",
                        ].map((permission, i) => (
                          <div
                            key={i}
                            className="flex items-center space-x-2"
                          >
                            <Switch
                              id={`teacher-${i}`}
                              defaultChecked={i < 4}
                            />
                            <Label htmlFor={`teacher-${i}`}>{permission}</Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Student</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                          "View personal grades",
                          "Download reports",
                          "View class schedule",
                          "Submit assignments",
                          "Contact teachers",
                          "View school announcements",
                        ].map((permission, i) => (
                          <div
                            key={i}
                            className="flex items-center space-x-2"
                          >
                            <Switch
                              id={`student-${i}`}
                              defaultChecked={i < 3}
                            />
                            <Label htmlFor={`student-${i}`}>{permission}</Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button onClick={() => toast.success("Permissions updated successfully")}>
                    Save Permissions
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="security" className="space-y-6 animate-fade-in">
              <Card>
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <Lock className="w-8 h-8 mt-1 text-primary" />
                    <div>
                      <CardTitle>Security Settings</CardTitle>
                      <CardDescription>
                        Configure system security and data protection settings
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Password Policy</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="min-password-length">
                          Minimum Password Length
                        </Label>
                        <Select defaultValue="8">
                          <SelectTrigger id="min-password-length">
                            <SelectValue placeholder="Select minimum length" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="6">6 characters</SelectItem>
                            <SelectItem value="8">8 characters</SelectItem>
                            <SelectItem value="10">10 characters</SelectItem>
                            <SelectItem value="12">12 characters</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="password-complexity">
                          Password Complexity
                        </Label>
                        <Select defaultValue="medium">
                          <SelectTrigger id="password-complexity">
                            <SelectValue placeholder="Select complexity" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">
                              Low (letters only)
                            </SelectItem>
                            <SelectItem value="medium">
                              Medium (letters + numbers)
                            </SelectItem>
                            <SelectItem value="high">
                              High (letters, numbers, symbols)
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password-expiry">
                          Password Expiry
                        </Label>
                        <Switch id="password-expiry" defaultChecked />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Require users to change their password every 90 days
                      </p>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Login Security</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                          <p className="text-sm text-muted-foreground">
                            Require administrators to use 2FA
                          </p>
                        </div>
                        <Switch id="two-factor" defaultChecked />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="lockout">Account Lockout</Label>
                          <p className="text-sm text-muted-foreground">
                            Lock accounts after 5 failed login attempts
                          </p>
                        </div>
                        <Switch id="lockout" defaultChecked />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="session-timeout">Session Timeout</Label>
                        <Select defaultValue="30">
                          <SelectTrigger id="session-timeout">
                            <SelectValue placeholder="Select timeout period" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="15">15 minutes</SelectItem>
                            <SelectItem value="30">30 minutes</SelectItem>
                            <SelectItem value="60">1 hour</SelectItem>
                            <SelectItem value="120">2 hours</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Data Protection</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="data-encryption">
                            Data Encryption
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Encrypt sensitive data stored in the system
                          </p>
                        </div>
                        <Switch id="data-encryption" defaultChecked />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="audit-logs">Audit Logging</Label>
                          <p className="text-sm text-muted-foreground">
                            Track all changes to student grades and user accounts
                          </p>
                        </div>
                        <Switch id="audit-logs" defaultChecked />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="backup-frequency">Backup Frequency</Label>
                        <Select defaultValue="daily">
                          <SelectTrigger id="backup-frequency">
                            <SelectValue placeholder="Select backup frequency" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="daily">Daily</SelectItem>
                            <SelectItem value="weekly">Weekly</SelectItem>
                            <SelectItem value="biweekly">Bi-weekly</SelectItem>
                            <SelectItem value="monthly">Monthly</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button onClick={() => toast.success("Security settings updated successfully")}>
                    Save Security Settings
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Advanced Security</CardTitle>
                  <CardDescription>
                    Configure additional security features
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="ip-restrictions">IP Restrictions</Label>
                      <p className="text-sm text-muted-foreground">
                        Limit system access to specific IP addresses or ranges
                      </p>
                    </div>
                    <Switch id="ip-restrictions" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="force-https">Force HTTPS</Label>
                      <p className="text-sm text-muted-foreground">
                        Always use secure connections for accessing the system
                      </p>
                    </div>
                    <Switch id="force-https" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="captcha">CAPTCHA on Login</Label>
                      <p className="text-sm text-muted-foreground">
                        Require CAPTCHA verification for login attempts
                      </p>
                    </div>
                    <Switch id="captcha" />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button variant="outline" onClick={() => toast.success("Advanced security settings updated")}>
                    Save Advanced Settings
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </Container>
      </div>
    </div>
  );
};

export default Settings;
