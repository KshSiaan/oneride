/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Controller, Control } from "react-hook-form";
import { Editor } from "primereact/editor";

interface Props {
  control: Control<any>;
  name: string;
}

export default function ContentEditor({ control, name }: Props) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) =>
        field.value ? ( // only render Editor if value exists
          <Editor
            style={{ height: "40vh" }}
            value={field.value}
            onTextChange={(e) => field.onChange(e.htmlValue)}
          />
        ) : (
          <p>Loading editor...</p>
        )
      }
    />
  );
}
