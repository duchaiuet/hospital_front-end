import React from 'react';

import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import { Add, Edit, Print, Search, Delete } from '@mui/icons-material';
import {
  Box,
  List,
  Divider,
  ListItem,
  Typography,
  ListItemIcon,
  ListItemText,
} from '@mui/material';

function ActionsPanel() {
  return (
    <Box sx={{ display: 'flex' }}>
      <Box sx={{ p: 2 }}>
        <Typography variant="body2" color="textSecondary">
          <strong>Chú thích:</strong>
        </Typography>
        <Box>
          <ol>
            <li>
              Đây là danh sách các văn bản chưa xếp số Công báo (mới tiếp nhận hoặc bị rút khỏi số 1
              để Công báo)
            </li>
            <li>
              Danh sách hiển thị theo 4 cột: Nhóm loại văn bản -{'>'} Cơ quan ban hành -{'>'} Văn
              bản -{'>'} Các file văn bản liên quan
              <ul>
                <li>
                  Nhóm loại văn bản: Nhóm Văn bản quy phạm pháp luật (gồm các nghị quyết, chỉ
                  thị...) và nhóm Văn bản khác
                </li>
                <li>Cơ quan ban hành: xếp lần lượt theo thứ tự được quy định trong luật</li>
                <li>Văn bản: gồm các bản chính và các file văn bản liên quan</li>
              </ul>
            </li>
            <li>
              Trong danh sách văn bản chính: có cột hiển thị các file văn bản liên quan, cột ghi chú
              hiển thị các văn bản bị rút khỏi số đã được số hóa và đang đợi xử lý
            </li>
            <li>
              Trong danh sách các file văn bản liên quan: hiển thị cột tên file văn bản liên quan
            </li>
            <li>
              4 cột văn bản hiển thị theo cấu trúc: &lt;Loại văn bản&gt; - &lt;Số, ký hiệu văn
              bản&gt; - &lt;Trích yếu&gt;
            </li>
            <li>
              Tìm kiếm văn bản theo tiêu chí:
              <ul>
                <li>Điền các thông tin vào các trường Số ký hiệu văn bản</li>
                <li>Chọn ngày ban hành theo trường Từ ngày và Đến ngày</li>
                <li>Chọn cơ quan ban hành</li>
              </ul>
            </li>
            <li>
              Chức năng tương tác:
              <ul>
                <li>
                  double click vào Số ký hiệu văn bản: dẫn chuyển tới màn hình thông tin văn bản
                </li>
                <li>chọn trong vùng tên file văn bản: dẫn tới nội dung file tương ứng</li>
              </ul>
            </li>
            <li>
              Quy ước về định dạng hiển thị số:
              <ul>
                <li>
                  Ngày &lt; 10, Tháng &lt; 3: phải tự động thêm ‘0’ ở trước. Ví dụ: 05/01/2024,
                  15/3/2024 là hợp lệ
                </li>
                <li>
                  Số lượng, số thứ tự &lt; 10: phải tự động thêm ‘0’ ở trước, áp dụng cho số trang,
                  số thứ tự trang, số ký hiệu văn bản
                </li>
              </ul>
            </li>
          </ol>
        </Box>
      </Box>
      <List component="nav" aria-label="main mailbox folders">
        <ListItem>
          <ListItemIcon>
            <Search />
          </ListItemIcon>
          <ListItemText primary="Thực hiện tìm kiếm theo tiêu chí" />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <Add />
          </ListItemIcon>
          <ListItemText primary="Chuyển sang màn hình Thông tin văn bản để nhập mới" />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <Print />
          </ListItemIcon>
          <ListItemText primary="Kết xuất danh sách văn bản trên màn hình ra file Excel" />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <OpenInFullIcon />
          </ListItemIcon>
          <ListItemText primary="Mở rộng khu vực tiêu chí tìm kiếm" />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemIcon>
            <Edit />
          </ListItemIcon>
          <ListItemText primary="Sửa văn bản" />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <Delete />
          </ListItemIcon>
          <ListItemText primary="Xóa văn bản" />
        </ListItem>
      </List>
    </Box>
  );
}

export default ActionsPanel;
