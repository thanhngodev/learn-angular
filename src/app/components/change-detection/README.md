# Change Detection in Angular

## Mô tả
Ứng dụng minh họa cơ chế Change Detection trong Angular với hai chiến lược:
- **Default**: Change Detection tự động kiểm tra toàn bộ cây component.
- **OnPush**: Tối ưu hóa hiệu suất bằng cách chỉ kiểm tra component khi có thay đổi tham chiếu hoặc trigger thủ công.

---

## Kết quả kiểm tra

### 1. Khi bấm **Change Parent Data**
#### Default Child:
- **Luôn in log**: `ChildDefaultComponent – ngOnChanges called`.
- **Lý do**: Mặc dù chỉ thay đổi thuộc tính trong object (giữ nguyên tham chiếu), Angular vẫn kiểm tra toàn bộ cây component.

#### OnPush Child:
- **Không in log**.
- **Lý do**: Tham chiếu của object không thay đổi, nên Angular bỏ qua component sử dụng `OnPush`.

---

### 2. Khi bấm **Change Parent Data with New Object**
#### Default Child:
- **Luôn in log**: `ChildDefaultComponent – ngOnChanges called`.
- **Lý do**: Angular luôn kiểm tra tất cả mọi thứ, không quan tâm đến tham chiếu.

#### OnPush Child:
- **In log**: `ChildOnPushComponent – ngOnChanges called`.
- **Lý do**: Tham chiếu object đã thay đổi (tạo object mới), nên `OnPush` kích hoạt kiểm tra.

---

### 3. Khi bấm **Force Trigger**
#### Các nút Force Trigger:
- **Force Trigger Change Reference**:
  - Tạo object mới để thay đổi tham chiếu của `parentData` và trigger change detection.
  - **Default Child** và **OnPush Child** đều sẽ được cập nhật.
- **Force Trigger All Tree Component**:
  - Sử dụng `markForCheck()` để đánh dấu toàn bộ cây component cần kiểm tra trong lần change detection tiếp theo.
  - **OnPush Child** sẽ được cập nhật, ngay cả khi tham chiếu không thay đổi.
- **Force Trigger OnPush**:
  - Gọi trực tiếp phương thức `refresh()` trong **OnPush Child**, sử dụng `ChangeDetectorRef.detectChanges()` để ép buộc kiểm tra component con cụ thể.

---

## Tổng Kết

| Hành động                          | Default Child            | OnPush Child                     |
|------------------------------------|--------------------------|-----------------------------------|
| Thay đổi giá trị trong object      | `ngOnChanges` được gọi   | `ngOnChanges` không được gọi     |
| Thay đổi tham chiếu (object mới)   | `ngOnChanges` được gọi   | `ngOnChanges` được gọi           |
| Ép buộc kiểm tra (`detectChanges`) | Không cần thiết           | Ép buộc kiểm tra được thực hiện  |
| Hiệu suất                          | Kiểm tra toàn bộ component | Tối ưu, chỉ kiểm tra khi cần thiết |

---

## Thêm `ChangeDetectorRef` để Trigger Change Detection

### Khi sử dụng `ChangeDetectorRef`:
#### Default Child:
- Không có thay đổi rõ rệt vì Angular đã tự động kiểm tra toàn bộ cây component.

#### OnPush Child:
- **Ép buộc kiểm tra**: `ChangeDetectorRef.detectChanges()` cho phép cập nhật giao diện ngay lập tức, bất kể tham chiếu có thay đổi hay không.
- **Ví dụ**: Gọi `refresh()` từ component cha để ép buộc component con `OnPush` cập nhật giao diện.

---

## Điểm Lưu Ý
- **OnPush** phù hợp khi làm việc với dữ liệu bất biến (immutable).
- Sử dụng **OnPush** trong các ứng dụng lớn để cải thiện hiệu suất.
- **Mutable data** (dữ liệu tham chiếu) có thể dẫn đến kết quả không mong muốn với **OnPush**.
- **`ChangeDetectorRef`** là công cụ mạnh mẽ để kiểm soát thủ công Change Detection khi cần thiết:
  - **`markForCheck`**: Đánh dấu toàn bộ cây component để kiểm tra.
  - **`detectChanges`**: Ép buộc kiểm tra ngay lập tức, chỉ áp dụng cho component hiện tại và con của nó.

---

## Hướng dẫn sử dụng ứng dụng

1. **Nút Change Parent**:
   - Thay đổi giá trị thuộc tính trong `parentData` (giữ nguyên tham chiếu).
   - **Default Child** sẽ được cập nhật. **OnPush Child** sẽ không cập nhật.

2. **Nút Change Parent New**:
   - Tạo object mới cho `parentData` (thay đổi tham chiếu).
   - Cả **Default Child** và **OnPush Child** đều sẽ được cập nhật.

3. **Nút Force Trigger**:
   - **Change Reference**: Tạo object mới và ép buộc kiểm tra với `detectChanges`.
   - **All Tree Component**: Đánh dấu toàn bộ cây component với `markForCheck`.
   - **OnPush**: Gọi trực tiếp phương thức `refresh()` của `OnPush Child`.

---

## Ví dụ Code

### Component Cha
```typescript
@Component({
  selector: "app-change-detection",
  template: `
    <button (click)="changeParentData()">Change Parent</button>
    <button (click)="changeParentDataWithNewObject()">Change Parent New</button>
    <button (click)="forceCheck(1)">Force Trigger Change Reference</button>
    <button (click)="forceCheck(2)">Force Trigger All Tree Component</button>
    <button (click)="forceCheck(3)">Force Trigger OnPush</button>
    <app-child-default [data]="parentData"></app-child-default>
    <app-child-onpush [data]="parentData"></app-child-onpush>
  `,
})
export class ChangeDetectionComponent {
  parentData = { message: "Initial Parent Data" };

  @ViewChild(ChildOnpushComponent) onPushChild!: ChildOnpushComponent;

  constructor(private cdr: ChangeDetectorRef) {}

  changeParentData() {
    this.parentData.message = "Updated Parent Data";
  }

  changeParentDataWithNewObject() {
    this.parentData = { message: "Updated Parent Data (New Object)" };
  }

  forceCheck(type: number) {
    switch (type) {
      case 1:
        this.parentData = { ...this.parentData };
        this.cdr.detectChanges();
        break;
      case 2:
        this.cdr.markForCheck();
        break;
      case 3:
        this.onPushChild.refresh();
        break;
    }
  }
}
