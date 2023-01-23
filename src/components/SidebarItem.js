import { ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";

function SidebarItem(props) {
  const { id, buttonClickHandler } = props;

  return (
    <ListItem>
      <ListItemButton id={id} onClick={buttonClickHandler}>
        <ListItemIcon>
          {props.children}
        </ListItemIcon>
        <ListItemText
          primary={id}
          sx={{ display: { sm: "none", md: "block" } }}
        />
      </ListItemButton>
    </ListItem>
  );
}

export default SidebarItem;
