import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { getStartTimeFromDate } from "~/utils/getStartTime";

const availableHours = Array.from(Array(24).keys());
const availableMinutes = Array.from(Array(60).keys());

type ExactTimeSelectProps = {
  onChange: (start: number) => void;
};

const ExactTimeSelect = ({ onChange }: ExactTimeSelectProps) => {
  const now = new Date();
  const [hours, setHours] = useState(now.getHours());
  const [minutes, setMinutes] = useState(now.getMinutes());

  useEffect(() => {
    onChange(getStartTimeFromDate(getStartTime(hours, minutes)));
  }, [hours, minutes, onChange]);

  return (
    <div className="flex items-center gap-2">
      <Select
        name="extact-time-hours"
        value={`${hours}`}
        onValueChange={(value) => setHours(parseInt(value, 10))}
      >
        <SelectTrigger className="w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="max-h-[40vh] overflow-y-scroll">
          {availableHours.map((hour) => (
            <SelectItem key={`hour-${hour}`} value={`${hour}`}>
              {hour < 10 ? `0${hour}` : hour}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <span>:</span>
      <Select
        name="exact-time-minutes"
        value={`${minutes}`}
        onValueChange={(value) => setMinutes(parseInt(value, 10))}
      >
        <SelectTrigger className="w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="max-h-[40vh] overflow-y-scroll">
          {availableMinutes.map((min) => (
            <SelectItem key={`minute-${min}`} value={`${min}`}>
              {min < 10 ? `0${min}` : min}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

function getStartTime(hours: number, minutes: number) {
  const now = new Date();

  const startTime = new Date();
  startTime.setHours(hours);
  startTime.setMinutes(minutes);

  if (now > startTime) {
    startTime.setHours(hours + 24);
  }

  return startTime;
}

export default ExactTimeSelect;
