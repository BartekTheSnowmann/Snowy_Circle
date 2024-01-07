import React from "react";
import { Badge } from "../ui/badge";
import DateConverter from "@/lib/utils/FormatDate";

interface Props {
  createdAt: Date;
}

function DateBadge({ createdAt }: Props) {
  return (
    <Badge className="pointer-events-none bg-transparent text-muted-foreground drop-shadow-md">
      {DateConverter({
        dateString: createdAt.toString(),
      })}
    </Badge>
  );
}

export default DateBadge;
