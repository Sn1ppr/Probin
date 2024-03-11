import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Button } from "@/components/ui/button";
// React Ace
import AceEditor from "react-ace";
import { config } from "ace-builds";
config.setModuleUrl("basePath", '/node_modules/ace-builds/src-min-noconflict');


// Supabase
import { supabase } from "../supabase/supabaseClient";

function SettingsPaste() {
  const [visibility, setVisibility] = useState(
    localStorage.getItem("visibility") ?? "no"
  );
  const [syntax, setSyntax] = useState(
    localStorage.getItem("syntax") ?? "private"
  );
  const [title, setTitle] = useState("Untitled Paste");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    alert(title + "\n" + syntax + "\n" + visibility);
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full">
      <Card className="w-[350px]" style={{ maxHeight: "244px" }}>
        <CardContent>
          <div className="grid w-full items-center gap-4 pt-6">
            <div className="flex flex-col space-y-1.5">
              <Input
                className="focus-visible:ring-0"
                id="title"
                placeholder="Untitled Paste"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setTitle(event.target.value)
                }
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Select
                defaultValue={syntax}
                onValueChange={(value: string) => setSyntax(value)}
              >
                <SelectTrigger id="syntax" className="focus-visible:ring-0">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="no">No Syntax</SelectItem>
                  <SelectItem value="html">HTML</SelectItem>
                  <SelectItem value="css">CSS</SelectItem>
                  <SelectItem value="javascript">Javascript</SelectItem>
                  <SelectItem value="xml">XML</SelectItem>
                  <SelectItem value="sql">SQL</SelectItem>
                  <SelectItem value="php">PHP</SelectItem>
                  <SelectItem value="python">Python</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Select
                defaultValue={visibility}
                onValueChange={(value: string) => setVisibility(value)}
              >
                <SelectTrigger id="visibility" className="focus-visible:ring-0">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="private">Private</SelectItem>
                  <SelectItem value="public">Public</SelectItem>
                  <SelectItem value="password">Password</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button className="w-full">
            Paste
            <FontAwesomeIcon className="ml-1.5 mt-0.5" icon={faChevronRight} />
          </Button>
        </CardFooter>
      </Card>

      <Card className="ml-6 w-full">
        <CardContent className="p-0">
          <AceEditor
            className="mt-3 mb-2 pr-1"
            height="75lvh"
            value={""}
            width="100%"
            highlightActiveLine={true}
            setOptions={{
              showLineNumbers: true,
            }}
          />
        </CardContent>
      </Card>
    </form>
  );
}

export default SettingsPaste;
