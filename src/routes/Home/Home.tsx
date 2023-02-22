import React, { useState, useEffect } from "react";
import { RootState, useAppSelector } from "store";
import { useLazyGetUsersQuery } from "store/api";
import {
  Box,
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Pagination,
  PaginationItem,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import spinner from "images/loading.svg";

const Home = () => {
  const { users } = useAppSelector((state: RootState) => state.userState);
  const [getUsers, { isError, isLoading }] = useLazyGetUsersQuery();

  const [page, setPage] = useState(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const fetchUsers = async () => {
    try {
      await getUsers(page);
    } catch (error) {
      console.error("rejected", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page]);

  if (isError) {
    return (
      <Box sx={{ display: "grid", justifyItems: "center", marginTop: "20px" }}>
        Something wrong
      </Box>
    );
  }
  return (
    <Container maxWidth="md">
      {isLoading ? (
        <Box
          sx={{ display: "grid", justifyItems: "center", marginTop: "20px" }}
        >
          <img src={spinner} alt="spinner" />
        </Box>
      ) : (
        <>
          <List sx={{ width: "100%", maxWidth: 360, margin: "auto" }}>
            {users &&
              users?.data.map((user, index) => {
                return (
                  <ListItem
                    key={index}
                    sx={{
                      bgcolor: "background.paper",
                      marginBottom: "20px",
                      p: "0px",
                      borderRadius: "7px",
                      boxShadow:
                        "rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em",
                    }}
                  >
                    <ListItemText
                      primary=""
                      sx={{
                        flexGrow: 0,
                        alignSelf: "stretch",
                        width: "40px",
                        m: "0px",
                        span: {
                          backgroundColor: "#0057ff",
                          height: "100%",
                          borderRadius: "7px 0px 0px 7px",
                        },
                      }}
                    />
                    <Box
                      display="flex"
                      alignItems="center"
                      sx={{ position: "relative", left: "-20px", py: "15px" }}
                    >
                      <ListItemAvatar>
                        <Avatar
                          alt="Remy Sharp"
                          src={user.avatar}
                          sx={{
                            width: "55px",
                            height: "55px",
                            border: "3px solid white",
                            mr: "10px",
                          }}
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary={`${user.first_name} ${user.last_name}`}
                        secondary={
                          <React.Fragment>
                            <Typography
                              sx={{ display: "inline" }}
                              component="span"
                              variant="body2"
                            >
                              {user.email}
                            </Typography>
                          </React.Fragment>
                        }
                      />
                    </Box>
                  </ListItem>
                );
              })}
          </List>
          {users && users?.total_pages > 1 && (
            <Pagination
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              count={users?.total_pages}
              page={page}
              onChange={handleChange}
              color="secondary"
              renderItem={(item) => (
                <PaginationItem
                  slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                  {...item}
                  color="secondary"
                />
              )}
            />
          )}
        </>
      )}
    </Container>
  );
};

export default Home;
