"use client";

import * as React from "react";
import { Clock } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface TimePickerProps {
  value: string;
  onChange: (time: string) => void;
  className?: string;
}

export function TimePickerDemo({
  value,
  onChange,
  className,
}: TimePickerProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  // Handle direct input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  // Handle time selection from dropdown
  const handleTimeSelect = (hour: number, minute: number) => {
    const formattedHour = hour.toString().padStart(2, "0");
    const formattedMinute = minute.toString().padStart(2, "0");
    onChange(`${formattedHour}:${formattedMinute}`);
    setIsOpen(false);
  };

  // Generate time options (every 30 minutes)
  const timeOptions = React.useMemo(() => {
    const options = [];
    for (let hour = 0; hour < 24; hour++) {
      for (const minute of [0, 30]) {
        options.push({ hour, minute });
      }
    }
    return options;
  }, []);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !value && "text-muted-foreground",
            className
          )}
        >
          <Clock className="mr-2 h-4 w-4" />
          {value || "Select time"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="p-3 border-b">
          <Label htmlFor="time-input">Enter time</Label>
          <Input
            id="time-input"
            type="time"
            value={value}
            onChange={handleInputChange}
            className="mt-1"
          />
        </div>
        <div className="py-2 h-[300px] overflow-y-auto">
          {timeOptions.map(({ hour, minute }, index) => {
            const formattedHour = hour.toString().padStart(2, "0");
            const formattedMinute = minute.toString().padStart(2, "0");
            const timeString = `${formattedHour}:${formattedMinute}`;
            const displayTime = new Date(
              2000,
              0,
              1,
              hour,
              minute
            ).toLocaleTimeString([], {
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            });

            return (
              <Button
                key={index}
                variant="ghost"
                className="w-full justify-start font-normal"
                onClick={() => handleTimeSelect(hour, minute)}
              >
                {displayTime}
              </Button>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}
