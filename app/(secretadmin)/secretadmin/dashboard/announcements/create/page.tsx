'use client'

import useAnnouncementUpload from "@/hooks/useAnnouncementUpload";
import { useAuth } from "@/hooks/useAuth";
import { Button, FileButton, FileInput, Image, Input } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { RichTextEditor, Link } from '@mantine/tiptap';
import { IconFilePlus } from "@tabler/icons-react";
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CreateAnnouncementPage() {
  const { user, loading: userLoading } = useAuth()
  const router = useRouter()
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link,
    ],
    immediatelyRender: false
  })
  const [image, setImage] = useState<File | null>()
  const [imageName, setImageName] = useState<string>("")
  const [title, setTitle] = useState<string>("")

  const { upload, error: uploadError, loading: uploadLoading, success: uploadSuccess } = useAnnouncementUpload()

  useEffect(() => {
    if (!userLoading) {
      if (!user) {
        router.push("/secretadmin")
      }
    }
  }, [user, userLoading])

  useEffect(() => {
    if (image) {
      const objectUrl = URL.createObjectURL(image)
      setImageName(objectUrl)
    } else {
      setImageName("")
    }
  }, [image])

  useEffect(() => {
    if (uploadError) {
      notifications.show({
        title: "Error",
        message: uploadError,
        autoClose: 2000,
        color: "red",
        position: "bottom-center"
      })
    }
  }, [uploadError])

  const uploadAnnouncement = async () => {
    const formDataUpload = new FormData()
    if (title === "") {
      notifications.show({
        title: "Error",
        message: "Please add a title!",
        autoClose: 2000,
        color: "red",
        position: "bottom-center"
      })
      return
    }

    if (editor?.getText() === "") {
      notifications.show({
        title: "Error",
        message: "Please make sure there's something in the body!",
        autoClose: 2000,
        color: "red",
        position: "bottom-center"
      })
      return
    }

    formDataUpload.append("title", title)
    formDataUpload.append("body", String(editor?.getHTML()))
    if (image) {
      formDataUpload.append("image", image)
    }
    console.log(formDataUpload.get("title"))
    console.log(formDataUpload.get("body"))

    if (!user) {
      return
    }

    upload(formDataUpload, user.token)
  }

  return (
    <>
      <div className="w-full h-screen flex justify-center items-center">
        <div className="w-1/2 h-full flex flex-col gap-5 justify-center items-center">
          <div className="w-full flex justify-end items-center">
            <Button onClick={uploadAnnouncement}>Post Announcement!</Button>
          </div>
          <Input.Wrapper label="Title" description="Please write the title of the announcement here!" className="w-full">
            <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title goes here..." className="w-full h-full" />
          </Input.Wrapper>
          <Input.Wrapper className="w-full h-1/3" label="Body" description="Please write the announcement body here.">
            <RichTextEditor editor={editor} className="h-full w-full">
              <RichTextEditor.Toolbar sticky stickyOffset={60} className="overflow-scroll">
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
              imageName ?
                <>
                  <Image className="object-center w-full h-full" fit="cover" src={imageName} />
                  <div className="w-full mt-2 flex justify-center items-center">
                    <FileButton accept="image/png,image/jpeg,image/jpg" onChange={setImage}>
                      {
                        (props) => (
                          <Button {...props}>Change Image</Button>
                        )
                      }
                    </FileButton>
                  </div>
                </>
                :
                <FileInput accept="image/png,image/jpeg,image/jpg" className="w-full h-full flex justify-center items-center" placeholder={<IconFilePlus />} value={image} onChange={setImage} />
            }
          </div>
        </div>
      </div>
    </>
  )
}
