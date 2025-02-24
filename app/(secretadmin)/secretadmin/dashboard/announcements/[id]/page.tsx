"use client"

import useFetchData from "@/hooks/useFetchData";
import { Button, Loader, Input, Image, FileButton, FileInput } from "@mantine/core";
import { RichTextEditor } from "@mantine/tiptap";
import { IconFilePlus } from "@tabler/icons-react";
import Link from "@tiptap/extension-link";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const ViewAnnouncement = () => {
  const { id } = useParams(); // Get the id from the URL
  const { data, loading, error } = useFetchData("/api/announcements/" + id)
  const [image, setImage] = useState<string>("")
  const [title, setTitle] = useState<string>("")
  const [body, setBody] = useState<string>("")
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link,
    ],
    immediatelyRender: false,
    content: body,
    onUpdate: ({ editor }) => {
      setBody(editor.getHTML())
    }
  })


  useEffect(() => {
    if (!loading) {
      if (data) {
        console.log(data)
        setImage(data.image)
        setTitle(data.title)
        setBody(data.body)
        if (editor && data.body) {
          editor.commands.setContent(data.body)
        }
      }
    }
  }, [data, editor])

  return (
    <>
      <div className="w-full min-h-screen flex justify-center items-center">
        <div className="w-1/2 h-full flex flex-col gap-5 justify-center items-center">
          <div className="w-full flex justify-end items-center">
            <Button>Post Announcement!</Button>
          </div>
          <Input.Wrapper label="Title" description="Please write the title of the announcement here!" className="w-full">
            <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title goes here..." className="w-full h-full" />
          </Input.Wrapper>
          <Input.Wrapper className="w-full h-1/3" label="Body" description="Please write the announcement body here.">
            <RichTextEditor editor={editor} className="h-full w-full overflow-scroll">
              <RichTextEditor.Toolbar sticky>
                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.Bold />
                  <RichTextEditor.Italic />
                  <RichTextEditor.Strikethrough />
                  <RichTextEditor.ClearFormatting />
                  <RichTextEditor.Code />
                </RichTextEditor.ControlsGroup>

                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.H1 />
                  <RichTextEditor.H2 />
                  <RichTextEditor.H3 />
                  <RichTextEditor.H4 />
                </RichTextEditor.ControlsGroup>

                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.Blockquote />
                  <RichTextEditor.Hr />
                  <RichTextEditor.BulletList />
                  <RichTextEditor.OrderedList />
                </RichTextEditor.ControlsGroup>

                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.Link />
                  <RichTextEditor.Unlink />
                </RichTextEditor.ControlsGroup>

                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.Undo />
                  <RichTextEditor.Redo />
                </RichTextEditor.ControlsGroup>
              </RichTextEditor.Toolbar>

              <RichTextEditor.Content />
            </RichTextEditor>

          </Input.Wrapper>
          <div className="w-full h-1/4 mt-10">
            {
              image ?
                <>
                  <Image className="object-center w-full h-full" fit="cover" src={image} />
                  <div className="w-full mt-2 flex justify-center items-center">
                  </div>
                </>
                :
                <FileInput accept="image/png,image/jpeg,image/jpg" className="w-full h-full flex justify-center items-center" placeholder={<IconFilePlus />} />
            }
          </div>
        </div>

      </div>
    </>
  );
};

export default ViewAnnouncement;
