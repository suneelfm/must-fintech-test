import React, { useEffect, useState } from "react";
import styles from "../../styles/MemberDetailsPage.module.css";
import { Grid, Pagination, PaginationItem } from "@mui/material";
import Dropdown from "../atoms/Dropdown";
import {
  APPROVAL_STATUSES,
  CHANGE_STATUS,
  ITEMS_PER_PAGE_OPTIONS,
  SHORT_OPTIONS,
  TABLE_COLUMNS,
} from "../../data/consts";
import Button from "../atoms/Button";
import Table from "../molecules/Table";
import mockData from "../../data/applicationList.json";
import ApprovalStatusTag from "../atoms/ApprovalStatusTag";
import FirstPageIcon from "../atoms/FirstPageIcon";
import LastPageIcon from "../atoms/LastPageIcon";
import MessageDialogue from "../molecules/MessageDialogue";
import { useParams } from "react-router-dom";

export default function MemberDetailsPage() {
  const [approvalStatus, setApprovalStatus] = useState(APPROVAL_STATUSES[0]);
  const [sortBy, setSortBy] = useState(SHORT_OPTIONS[0]);
  const [itemsPerPage, setItemsPerPage] = useState(ITEMS_PER_PAGE_OPTIONS[0]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [applicationList, setApplicationList] = useState([]);
  const [dialogue, setDialogue] = useState({
    message: "",
    type: "",
    isCancelRequired: false,
  });
  const [changeStatus, setChangeStatus] = useState(null);
  const data = mockData.map((d, i) => ({ ...d, id: i + 1 }));
  const totalItems = data.length;
  const itemsWaitingForApproval = data.filter(
    (data) => data.approval === "승인대기"
  ).length;

  const { section } = useParams();

  useEffect(() => {
    const SORT_BY_KEY = {
      신청일시순: "applicationDate",
      승인일시순: "approvalDate",
    };
    const filtered =
      approvalStatus === "승인여부 전체"
        ? data
        : data.filter((d) => d.approval === approvalStatus);
    const pageItems = filtered.slice(
      (pageNo - 1) * parseInt(itemsPerPage),
      pageNo * parseInt(itemsPerPage)
    );
    const sorted = pageItems.sort(
      (a, b) =>
        new Date(b[SORT_BY_KEY[sortBy]]) - new Date(a[SORT_BY_KEY[sortBy]])
    );
    setApplicationList(sorted);
  }, [pageNo, itemsPerPage, approvalStatus, sortBy]);

  const handleRowSelection = (e, rowId) => {
    const isChecked = e.target.checked;
    if (Array.isArray(rowId)) {
      if (isChecked) {
        setSelectedItems(rowId);
        return;
      } else {
        setSelectedItems([]);
        return;
      }
    }
    const selectedItemsCopy = [...selectedItems];
    if (isChecked) {
      selectedItemsCopy.push(rowId);
      setSelectedItems(selectedItemsCopy);
    } else {
      const filtered = selectedItems.filter((item) => item !== rowId);
      setSelectedItems(filtered);
    }
  };

  const handleSave = () => {
    if (!selectedItems.length) {
      setDialogue({
        message: "선택된 신청건이 없습니다.",
        type: "warn",
        isCancelRequired: false,
      });
      return;
    }
    const existingApprove = selectedItems.filter(
      (item) => data.find((d) => d.approval === "승인완료").id === item
    );
    if (existingApprove.length) {
      setDialogue({
        message: "이미 승인 완료된 회원입니다.",
        type: "warn",
        isCancelRequired: false,
      });
      return;
    }
    const existingRejected = selectedItems.filter(
      (item) => data.find((d) => d.approval === "승인거부").id === item
    );
    if (existingRejected.length) {
      setDialogue({
        message: "이미 승인 거부된 회원입니다.",
        type: "warn",
        isCancelRequired: false,
      });
      return;
    }
    if (changeStatus) {
      setDialogue({
        message: `선택된 ${selectedItems.length}건의 승인상태를 변경하시겠습니까?`,
        type: "warn",
        isCancelRequired: true,
      });
      return;
    }
  };

  const handleDialogueAccept = () => {
    if (dialogue.message.includes("건의 승인상태를 변경하시겠습니까?")) {
      setDialogue({
        message: "저장되었습니다.",
        type: "success",
        isCancelRequired: false,
      });
    } else {
      setDialogue({ message: "", type: "" });
    }
  };

  if (section !== "investment_type")
    return (
      <div style={{ padding: "50px", textAlign: "center" }}>
        Not developed as not part of requirement
      </div>
    );

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
              value={sortBy}
              options={SHORT_OPTIONS}
              onDropdownChange={(value) => setSortBy(value)}
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
              value={changeStatus}
              onDropdownChange={(value) => setChangeStatus(value)}
              options={CHANGE_STATUS}
              width="100px"
              label="승인상태 변경"
            />
          </Grid>
          <Button onClick={handleSave}>저장</Button>
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
          selectedRows={selectedItems}
          onRowSelect={handleRowSelection}
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
          renderItem={(item) => (
            <PaginationItem
              {...item}
              slots={{
                first: FirstPageIcon,
                last: LastPageIcon,
              }}
            />
          )}
          sx={{
            "& .css-10w330c-MuiButtonBase-root-MuiPaginationItem-root.Mui-selected":
              {
                backgroundColor: "#2A3958 !important",
                color: "#ffffff !important",
                fontSize: "14px !important",
                fontWeight: "600 !important",
              },
            "& .css-18lqwt2.Mui-selected": {
              backgroundColor: "#2A3958 !important",
              color: "#ffffff !important",
              fontSize: "14px !important",
              fontWeight: "600 !important",
            },
          }}
        />
      </Grid>
      {dialogue.message && (
        <MessageDialogue
          messageType={dialogue.type}
          message={dialogue.message}
          onClose={() => setDialogue({ message: "", type: "" })}
          onAccept={handleDialogueAccept}
          cancelRequired={dialogue.isCancelRequired}
        />
      )}
    </div>
  );
}
