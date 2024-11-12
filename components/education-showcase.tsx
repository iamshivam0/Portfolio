import { Education } from "@/lib/data";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";
import DateRange from "./date-range";
import { PiGraduationCap } from "react-icons/pi";

interface EducationShowcaseProps {
  education: Education;
  whetherlast: boolean;
}

export default function EducationShowcase({
  education,
  whetherlast,
}: EducationShowcaseProps) {
  return (
    <div className="">
      <div className="space-y-2">
        <div className="flex justify-between">
          <div className="flex items-center space-x-4">
            <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
              <PiGraduationCap className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold leading-none tracking-tight">
                {education.institution}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                {education.degree}
                {education.fieldOfStudy && (
                  <span className="text-muted-foreground">
                    {" "}
                    • {education.fieldOfStudy}
                  </span>
                )}
              </p>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <DateRange date={education.years} />
            <p className="text-sm font-medium text-primary mt-1 mr-5">
              {education.Marks}
            </p>
          </div>
        </div>
      </div>
      {!whetherlast && <Separator className="mt-6" />}
    </div>
  );
}
