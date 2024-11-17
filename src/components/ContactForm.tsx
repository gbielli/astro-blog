import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  phoneNumber: z.string().min(6, "Phone number is required"),
  email: z.string().email("Invalid email address"),
});

type FormData = z.infer<typeof formSchema>;

const FormInput = React.forwardRef<
  HTMLInputElement,
  React.ComponentPropsWithoutRef<"input"> & { label: string }
>(({ label, id, ...props }, ref) => {
  const inputId = id || React.useId();

  return (
    <label
      htmlFor={inputId}
      className="block h-full box-border border-2 rounded-md p-[10px] has-[:focus]:border-blue-500 
      transition-colors duration-200 cursor-text"
    >
      <span className="text-sm text-gray-500 leading-none block mb-[8px]">
        {label}
      </span>
      <input
        id={inputId}
        className="w-full bg-transparent leading-none border-0 p-0 text-base font-semibold 
        text-black focus:outline-none appearance-none [&:-webkit-autofill]:bg-transparent
        [&:-webkit-autofill]:[-webkit-text-fill-color:black]
        [&:-webkit-autofill]:hover:bg-transparent
        [&:-webkit-autofill]:focus:bg-transparent
        [&:-webkit-autofill]:[transition:background-color_9999s_ease-in-out_0s]"
        ref={ref}
        {...props}
      />
    </label>
  );
});

FormInput.displayName = "FormInput";

type FormFieldConfig = {
  name: keyof FormData;
  label: string;
  type?: string;
};

const FORM_FIELDS: FormFieldConfig[] = [
  { name: "firstName", label: "First Name" },
  { name: "lastName", label: "Last Name" },
  { name: "phoneNumber", label: "Phone Number", type: "tel" },
  { name: "email", label: "Email Address", type: "email" },
];

export default function ContactForm() {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
    },
  });

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Your Information</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(console.log)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {FORM_FIELDS.map(({ name, label, type }) => (
                <FormField
                  key={name}
                  control={form.control}
                  name={name}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <FormInput label={label} type={type} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
            </div>
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
