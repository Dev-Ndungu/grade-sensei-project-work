
import React from "react";
import { Input } from "@/components/ui/input";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { LucideIcon } from "lucide-react";

interface TextInputProps {
  form: UseFormReturn<any>;
  name: string;
  label: string;
  placeholder: string;
  icon: LucideIcon;
  type?: string;
}

export const TextInput = ({ 
  form, 
  name, 
  label, 
  placeholder, 
  icon: Icon, 
  type = "text" 
}: TextInputProps) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <div className="relative">
            <Icon className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
            <FormControl>
              <Input
                type={type}
                placeholder={placeholder}
                className="pl-10"
                {...field}
              />
            </FormControl>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
