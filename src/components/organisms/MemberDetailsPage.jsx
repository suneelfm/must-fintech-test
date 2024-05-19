import React, { useEffect, useState } from "react";
import styles from "../../styles/MemberDetailsPage.module.css";
import { Grid, Pagination } from "@mui/material";
import Dropdown from "../atoms/Dropdown";
import {
  APPROVAL_STATUSES,
  ITEMS_PER_PAGE_OPTIONS,
  SHORT_OPTIONS,
  TABLE_COLUMNS,
} from "../../data/consts";
import Button from "../atoms/Button";
import Table from "../molecules/Table";
import mockData from "../../data/applicationList.json";
import ApprovalStatusTag from "../atoms/ApprovalStatusTag";

export default function MemberDetailsPage() {
  const [approvalStatus, setApprovalStatus] = useState(APPROVAL_STATUSES[0]);
  const [shortBy, setShortBy] = useState(SHORT_OPTIONS[0]);
  const [itemsPerPage, setItemsPerPage] = useState(ITEMS_PER_PAGE_OPTIONS[0]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [applicationList, setApplicationList] = useState([]);
  const data = mockData.map((d, i) => ({ ...d, id: i + 1 }));
  const totalItems = data.length;
  const itemsWaitingForApproval = data.filter(
    (data) => data.approval === "승인대기"
  ).length;

  useEffect(() => {
    const pageItems = data.slice(
      (pageNo - 1) * parseInt(itemsPerPage),
      pageNo * parseInt(itemsPerPage)
    );
    setApplicationList(pageItems);
  }, [pageNo, itemsPerPage]);

  return (
    <div className={styles.pageWrapper}>
      <Grid container borderBottom={"1px solid #d7d8da"}>
        <Grid
          item
          xs={12}
          sm={4}
          md={3}
          lg={2}
          marginBottom={"10px"}
          display={"flex"}
          alignItems={"center"}
        >
          <span className={styles.sectionTitle}>신청 목록</span>
          <span className={styles.itemsData}>
            {`(총 ${totalItems}명 | 승인대기 `}
            <span>{itemsWaitingForApproval}</span>건)
          </span>
        </Grid>
        <Grid
          container
          item
          xs={12}
          sm={8}
          md={9}
          lg={10}
          alignItems={"center"}
          justifyContent={"flex-end"}
          spacing={1}
        >
          <Grid
            width={{ xs: "100%", sm: "125px" }}
            marginBottom={"10px"}
            marginLeft={"5px"}
          >
            <Dropdown
              value={approvalStatus}
              options={APPROVAL_STATUSES}
              onDropdownChange={(value) => setApprovalStatus(value)}
            />
          </Grid>
          <Grid
            width={{ xs: "100%", sm: "115px" }}
            marginBottom={"10px"}
            marginLeft={"5px"}
          >
            <Dropdown
              value={shortBy}
              options={SHORT_OPTIONS}
              onDropdownChange={(value) => setShortBy(value)}
            />
          </Grid>
          <Grid
            width={{ xs: "100%", sm: "115px" }}
            marginBottom={"10px"}
            marginLeft={"5px"}
          >
            <Dropdown
              value={itemsPerPage}
              options={ITEMS_PER_PAGE_OPTIONS}
              onDropdownChange={(value) => {
                setItemsPerPage(value);
                setPageNo(1);
              }}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid container paddingTop={"10px"}>
        <Grid item xs={3} sm={2}>
          <Button>등록</Button>
        </Grid>
        <Grid
          item
          xs={9}
          sm={10}
          display={"flex"}
          justifyContent={"flex-end"}
          alignItems={"center"}
        >
          <span className={styles.selectedItemsCount}>
            선택한 {selectedItems.length}건
          </span>
          <Grid width={"150px"} paddingRight={"5px"} marginLeft={"15px"}>
            <Dropdown
              options={["승인완료", "승인거부"]}
              width="100px"
              label="승인상태 변경"
            />
          </Grid>
          <Button>저장</Button>
        </Grid>
      </Grid>
      <Grid
        container
        marginTop={"5px"}
        overflow={"auto"}
        width={"100%"}
        height={"calc(100% - 120px)"}
      >
        <Table
          columns={TABLE_COLUMNS}
          rows={applicationList.map((data) => ({
            ...data,
            submittedDocs: (
              <Button variant="solid" size="small">
                보기
              </Button>
            ),
            approval: <ApprovalStatusTag tag={data.approval} />,
          }))}
        />
      </Grid>
      <Grid container justifyContent={"center"} mt={1}>
        <Pagination
          shape="rounded"
          count={Math.ceil(data.length / parseInt(itemsPerPage))}
          page={pageNo}
          onChange={(e, page) => setPageNo(page)}
          showFirstButton
          showLastButton
          sx={{
            "& .css-10w330c-MuiButtonBase-root-MuiPaginationItem-root.Mui-selected":
              {
                backgroundColor: "#2A3958",
                color: "#ffffff",
                fontSize: "14px",
                fontWeight: "600",
              },
            "& .css-10w330c-MuiButtonBase-root-MuiPaginationItem-root": {
              color: "#A1A1A1",
              fontSize: "14px",
              fontWeight: "600",
            },
            "& .css-1v2lvtn-MuiPaginationItem-root": {
              color: "#A1A1A1",
              fontWeight: "600",
            },
          }}
        />
      </Grid>
    </div>
  );
}
