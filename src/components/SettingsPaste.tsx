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
config.setModuleUrl("basePath", "/node_modules/ace-builds/src-min-noconflict");

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
  const [password, setPassword] = useState("");
  const [aceValue, setAceValue] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const content = aceValue;
    const id = Math.random().toString(36).substr(2, 8);

    // Insérer les données dans la table "pastes"
    const { data, error } = await supabase.from("pastes").insert([
      {
        id,
        title,
        syntax,
        visibility,
        content,
        password,
        timestamp: new Date().toLocaleString("fr-FR", {
          timeZone: "Europe/Paris",
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
      },
    ]);

    if (error) {
      console.log("Erreur lors de l'insertion des données:", error.message);
    } else {
      window.location.href = `/${id}`;
      console.log("Données insérées avec succès:");
      setTitle("Untitled Paste");
      setSyntax("");
      setVisibility("");
      setPassword("");
      setAceValue("");
    }
  };
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };
  const handleAceChange = (value: string) => {
    setAceValue(value);
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full">
      <Card className="w-[350px]" style={{ height: "-webkit-fill-available" }}>
        <CardContent>
          <div className="grid w-full items-center gap-4 pt-6">
            <div className="flex flex-col space-y-1.5">
              <Input
                name="title"
                placeholder="Untitled Paste"
                onChange={handleTitleChange}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Select
                defaultValue={syntax}
                onValueChange={(value: string) => setSyntax(value)}
              >
                <SelectTrigger name="syntax">
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
                <SelectTrigger name="visibility">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="private">Private</SelectItem>
                  <SelectItem value="public">Public</SelectItem>
                  <SelectItem value="password">Password</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {visibility === "password" && (
              <div className="flex flex-col space-y-1.5">
                <Input
                  name="password"
                  placeholder="Password"
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setPassword(event.target.value)
                  }
                />
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="submit" className="w-full">
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
            value={aceValue}
            onChange={handleAceChange}
            width="100%"
            highlightActiveLine={false}
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
