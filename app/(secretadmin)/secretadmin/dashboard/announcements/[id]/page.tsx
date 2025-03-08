"use client"

import useAnnouncementDelete from "@/hooks/useAnnouncementDelete";
import useAnnouncementEdit from "@/hooks/useAnnouncementEdit";
import { useAuth } from "@/hooks/useAuth";
import useFetchData from "@/hooks/useFetchData";
import { Button, Input, Image, FileButton, FileInput, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { RichTextEditor } from "@mantine/tiptap";
import { IconCheck, IconFilePlus } from "@tabler/icons-react";
import Link from "@tiptap/extension-link";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ViewAnnouncement = () => {
  const { user, loading: userLoading } = useAuth()
  const router = useRouter()
  const { id } = useParams(); // Get the id from the URL
  const { data, loading } = useFetchData("/api/announcements/" + id)
  const [image, setImage] = useState<string>("")
  const [title, setTitle] = useState<string>("")
  const [notifId, setNotifId] = useState<string>("")
  const [deleteNotifId, setDeleteNotifId] = useState<string>("")

  const [body, setBody] = useState<string>("")
  const [imageFile, setImageFile] = useState<File | null>()
  const { success, loading: editLoading, error: editError, uploadEdit } = useAnnouncementEdit()
  const { success: deleteSuccess, loading: deleteLoading, error: deleteError, deleteUpload } = useAnnouncementDelete()

  const [opened, { open, close }] = useDisclosure(false)
  const [deleteString, setDeleteString] = useState<string>("")

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
    if (editLoading) {
      setNotifId(notifications.show({
        loading: true,
        title: "Making edits to your Announcement right now! ",
        message: "Just sit down and chill we're doing cool things in the background!",
        autoClose: false,
        withCloseButton: false,
        position: "bottom-center"
      }))
    }

    if (!editLoading) {
      if (editError) {
        notifications.update({
          id: notifId,
          title: "Oh no something went wrong!",
          message: editError,
          autoClose: 2000,
          color: "red",
          position: "bottom-center"
        })
      }
      if (success) {
        notifications.update({
          id: notifId,
          title: "Edit Successful!",
          message: "Your awesome edited announcement is now up in the web!",
          autoClose: 2000,
          loading: false,
          icon: <IconCheck size={18} />,
          position: "bottom-center"
        })
        router.push("/secretadmin/dashboard/announcements")
      }
    }


    console.log("Successful delete: ", deleteSuccess)
    if (deleteLoading) {
      setDeleteNotifId(notifications.show({
        loading: true,
        title: "Deleting your Announcement right now! ",
        message: "Just sit down and chill we're doing cool things in the background!",
        autoClose: false,
        withCloseButton: false,
        position: "bottom-center"
      }))
    }

    if (!deleteLoading) {
      if (deleteError) {
        notifications.update({
          id: deleteNotifId,
          title: "Oh no something went wrong!",
          message: deleteError,
          autoClose: 2000,
          color: "red",
          position: "bottom-center"
        })
      }
      if (deleteSuccess) {
        notifications.update({
          id: deleteNotifId,
          title: "Delete Successful!",
          message: "Your awesome announcement is now gone from the web!",
          autoClose: 2000,
          loading: false,
          icon: <IconCheck size={18} />,
          position: "bottom-center"
        })
        router.push("/secretadmin/dashboard/announcements")
      }
    }
  }, [success, editLoading, editError, deleteSuccess, deleteError, deleteLoading, router, notifId, deleteNotifId])

  useEffect(() => {
    if (!userLoading) {
      if (!user) {
        router.push("/secretadmin")
      }
    }
  }, [user, userLoading, router])

  useEffect(() => {
    if (imageFile) {
      const objectUrl = URL.createObjectURL(imageFile)
      setImage(objectUrl)
    } else {
      setImage("")
    }
  }, [imageFile])


  useEffect(() => {
    if (!loading) {
      if (data) {
        setImage(data.image)
        setTitle(data.title)
        setBody(data.body)
        if (editor && data.body) {
          editor.commands.setContent(data.body)
        }
      }
      console.log(data)
      // if (!data) {
      //   notifications.show({
      //     title: "No announcement as such exists!",
      //     message: "There is no announcement found.",
      //     color: "orange",
      //     autoClose: 2000,
      //     position: "bottom-center"
      //   })
      //   router.push("/secretadmin/dashboard/announcements")
      // }
    }
  }, [data, editor, loading])

  const saveChanges = () => {
    const formDataChanges = new FormData()

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


    formDataChanges.append("title", title)
    formDataChanges.append("body", body)
    if (imageFile) {
      formDataChanges.append("image", imageFile)
    }
    formDataChanges.append("id", String(id))

    if (!user) {
      return
    }

    uploadEdit(formDataChanges, user.token)
  }

  const deleteAnnouncement = () => {
    if (deleteString !== "DELETE") {
      notifications.show({
        title: "Please type DELETE",
        message: "Please type DELETE for full confirmation of this action.",
        autoClose: 2000,
        color: "red",
        position: "bottom-center"
      })
      return
    }
    if (!user) {
      return
    }
    deleteUpload(String(id), user.token)
  }

  return (
    <>
      <Modal opened={opened} onClose={close} title={`Delete '${title}'`} centered className="text-center">
        <div className="flex flex-col gap-5 text-center">
          <Input.Wrapper label="Are you sure about this? This is irreversible" description="To delete please type DELETE" className="w-full">
            <Input value={deleteString} onChange={(e) => setDeleteString(e.target.value)} placeholder="Type delete here..." className="w-full h-full" />
          </Input.Wrapper>
          <Button color="red" onClick={deleteAnnouncement}>DELETE</Button>
        </div>
      </Modal>
      <div className="w-full min-h-screen flex justify-center items-center py-10">
        <div className="w-1/2 h-full flex flex-col gap-5 justify-center items-center">
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
                  <Image className="object-center w-full h-full" fit="cover" src={image} alt={image} />
                  <div className="w-full mt-2 flex justify-center items-center">
                    <FileButton accept="image/png,image/jpeg,image/jpg" onChange={setImageFile}>
                      {
                        (props) => (
                          <Button {...props}>Change Image</Button>
                        )
                      }
                    </FileButton>
                  </div>
                </>
                :
                <FileInput accept="image/png,image/jpeg,image/jpg" className="w-full h-full flex justify-center items-center" onChange={setImageFile} placeholder={<IconFilePlus />} />
            }
          </div>
          <div className="w-full flex justify-between items-center">
            <Button color="red" onClick={open}>Delete</Button>
            <Button onClick={saveChanges}>Save Changes</Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewAnnouncement;
