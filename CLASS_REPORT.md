# CE306: Assignment 1 - Project’s Business Understanding and Technical Information

**By Natthakit Thawaichai — Computer Engineering**

---

## Pain Point

ตลอด 1 ปี 8 เดือนที่ผมทำงานในร้านอาหารในห้างแห่งหนึ่ง ผมสังเกตเห็นปัญหาที่ไม่ถูกแก้ไข:

1. พนักงานแต่ละท่านทำงานหนัก-เบาไม่เท่ากัน เพราะการจัดตารางงานที่ไม่เท่าเทียมและขาดความรอบคอบ
2. ผู้จัดการ (บางท่าน) มีความลำเอียงในการจัดตารางงาน ทำให้เพื่อน ๆ พี่ ๆ น้อง ๆ ที่รักของผู้จัดการท่านดังกล่าวทำงานสบายกว่าพนักงานส่วนอื่น
3. การจัดตารางงานที่ไม่ **“make sense”** เช่น ให้ล้างจาน 2 ชั่วโมง แล้วไปยืนหน้าบ้านรับลูกค้า ทำให้ตัวมีกลิ่นชื้นไม่พึงประสงค์ และอาจทำให้ร้านถูก **complain** ได้

---

## Solution

ผมนำเสนอ **Rostify©** ระบบ record การลงงาน จัดสรรตารางงาน ตัดชั่วโมง และ assign ตำแหน่งอย่างเท่าเทียม สร้างขึ้นเพื่อคนทำงาน โดยคนทำงาน

---

## Target User

* องค์กร และ/หรือร้านอาหารทั่วไปที่มีพนักงานจำนวนมาก และ/หรือมีตารางงานการทำงานที่ flexible
* ผู้จัดการองค์กร และ/หรือร้านอาหารทั่วไปที่ต้องการให้พนักงานทุกท่านทำงานเท่า ๆ กัน และไม่ต้องการใช้ระบบ **“เพื่อน พี่ น้องรัก”** และ **“ลูกท่าน หลานเธอ”**
* ผู้จัดการองค์กร และ/หรือร้านอาหารทั่วไปที่ต้องการให้องค์กรใต้บังคับบัญชานั้นดำเนินกิจการได้ โดยไม่ต้องพึ่งพาพนักงานบางท่านมากจนเกินไป และป้องกันการ **“over-occupation”** ของพนักงาน

โดยรวมแล้ว คือผู้จัดการองค์กร และ/หรือร้านอาหารทั่วไปที่ **“care”** ลูกน้องใต้บังคับบัญชาของท่านอย่างเท่าเทียม มากกว่าจะให้ประโยชน์กับ **“เพื่อน พี่ น้องรัก”** ของผู้จัดการท่านนั้น

---

## Feature Scope

* ผู้ใช้นำข้อมูลเข้า เช่น

  * ใคร
  * ว่างวันไหน
  * ว่างช่วงเวลาใดถึงเวลาใด
* มีการแยก privilege ของผู้ใช้อย่างชัดเจน
* Generate ตารางงานและแบ่งงานอย่างเท่าเทียมที่สุด
* Assign หน้าที่ตามเวลาให้ **“make sense”**

---

## Goal

* พนักงานได้ตารางงานที่ **“fair”** และเท่าเทียม
* ลดความเสี่ยงของการลาออกอันเกิดจากการได้รับภาระงานที่ไม่เหมาะสม
* แก้ไขปัญหาความเหลื่อมล้ำทางอำนาจ และลดระบบ **“เพื่อน พี่ น้องรัก”**
* ช่วยส่งเสริมความเป็นธรรมในการจัดสรรภาระงาน และลดโอกาสที่พนักงานบางรายจะได้รับภาระงานมากเกินไป

---

# Technical Information

| Component         | Technology                            |
| ----------------- | ------------------------------------- |
| Framework         | NextJS (Full-stack)                   |
| Database          | SQLite                                |
| Scheduler Engine  | Custom-made Rostify Scheduler Engine  |
| Constraint Engine | Custom-made Rostify Constraint Engine |
| Authentication    | Username/password authentication      |

---

# RESTful API Endpoints & CRUDs

## `/generate`

### `GET /generate`

Generates and returns both a schedule and roster.

### `GET /generate/roster`

Generates and returns a roster.

### `GET /generate/schedule`

Generates and returns a schedule.

---

## `/record`

### `GET /record`

Returns all recorded rosters and schedules.

### `GET /record/:date`

Returns all recorded rosters and schedules for the specified date.

### `GET /record/:date/:id`

Returns a recorded roster with an exact ID that was generated for the specified date.

### `POST /record`

Records a roster into the database.

### `DELETE /record/:date`

Deletes all recorded rosters generated for the specified date.

**Requires manager privilege.**

### `DELETE /record/:date/:id`

Deletes a recorded roster with an exact ID that was generated for the specified date.

**Requires manager privilege.**

---

# `/auth`

## Registration

### `GET /auth/registrations`

Returns all registration request details.

**Requires manager privilege.**

### `GET /auth/registrations/:id`

Returns registration request details with an exact ID.

**Requires manager privilege.**

### `POST /auth/register`

Processes registration information, uploads it to the database, and waits for approval.

### `POST /auth/registrations/:id/approve`

Approves a registration request with an exact ID.

**Requires manager privilege.**

### `POST /auth/registrations/:id/reject`

Rejects a registration request with an exact ID.

**Requires manager privilege.**

---

## Login

### `POST /auth/login`

Processes login information and returns session information if authentication is successful.

---

## Users

### `GET /auth/users`

Returns all users' display information.

**Requires manager privilege.**

### `GET /auth/users/:id`

Returns a user's display information with an exact ID.

**Requires either manager privilege or the user must be accessing their own information.**

### `PATCH /auth/users/:id`

Modifies a user's information.

**The requester must be the user themselves.**

### `DELETE /auth/users/:id`

Deletes a user's information.

**Requires either manager privilege or the user must be deleting their own account.**

---

# `/employees`

### `GET /employees`

Returns all existing employees and their information.

### `GET /employees/:id`

Returns information about an employee with an exact ID.

### `POST /employees`

Adds a new employee.

### `PATCH /employees/:id`

Updates employee information.

**Requires manager privilege.**

### `DELETE /employees/:id`

Deletes employee information.

**Requires manager privilege.**

---

# `/positions`

### `GET /positions`

Returns all existing positions and their information.

### `GET /positions/:position`

Returns information about a specific position.

### `POST /positions`

Adds a new position.

**Requires manager privilege.**

### `PATCH /positions/:position`

Updates position information.

**Requires manager privilege.**

### `DELETE /positions/:position`

Deletes position information.

**Requires manager privilege.**

---

# `/areas`

### `GET /areas`

Returns all existing areas and their information.

### `GET /areas/:area`

Returns information about a specific area.

### `POST /areas`

Adds a new area.

**Requires manager privilege.**

### `PATCH /areas/:area`

Updates area information.

**Requires manager privilege.**

### `DELETE /areas/:area`

Deletes area information.

**Requires manager privilege.**

---

## Future Updates

Future updates are expected.

Suggestions are welcomed.

---

## Project Repository

https://github.com/0xA1525A/rostify