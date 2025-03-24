
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SearchIcon, Filter, FileText } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { forms, subjects, terms } from "@/types/grades";

interface GradeFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  selectedForm: string;
  setSelectedForm: (value: string) => void;
  selectedSubject: string;
  setSelectedSubject: (value: string) => void;
  selectedTerm: string;
  setSelectedTerm: (value: string) => void;
}

const GradeFilters: React.FC<GradeFiltersProps> = ({
  searchTerm,
  setSearchTerm,
  selectedForm,
  setSelectedForm,
  selectedSubject,
  setSelectedSubject,
  selectedTerm,
  setSelectedTerm,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
      <div className="relative flex items-center">
        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search students..."
          className="pl-9"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="flex items-center gap-2">
        <Filter size={16} className="text-muted-foreground" />
        <Select
          value={selectedForm}
          onValueChange={setSelectedForm}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Form" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All Forms">All Forms</SelectItem>
            {forms.map((form) => (
              <SelectItem key={form} value={form}>
                {form}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Select
        value={selectedSubject}
        onValueChange={setSelectedSubject}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select Subject" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="All Subjects">All Subjects</SelectItem>
          {subjects.map((subject) => (
            <SelectItem key={subject} value={subject}>
              {subject}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={selectedTerm}
        onValueChange={setSelectedTerm}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select Term" />
        </SelectTrigger>
        <SelectContent>
          {terms.map((term) => (
            <SelectItem key={term} value={term}>
              {term}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="flex justify-end">
        <Button variant="outline" className="gap-2">
          <FileText size={16} />
          Generate Reports
        </Button>
      </div>
    </div>
  );
};

export default GradeFilters;
