# Profile Management System Testing Documentation

## Assignment 3: Build Unit Test Automation Solution (Part-2 of Towards TestOps Framework)

### Display Module

#### 1. Equivalence Class Partitioning (ECP)
- **Valid State:** There are profiles in the database.
- **Valid State (No Profiles):** There are no profiles in the database.

#### 2. Boundary Value Analysis (BVA)
- **Empty Collection:** The boundary where the number of profiles is 0.
- **One Profile:** The minimum non-empty boundary, ensuring that there is exactly one profile in the database.

---

### Insert Module

#### 1. Equivalence Class Partitioning (ECP)
ECP divides inputs into partitions where the behavior should be the same. For example:
- **Valid Inputs:** 
  - A valid name (non-empty string)
  - Valid age (positive integer)
  - Valid contact (non-empty string)

- **Invalid Inputs:**
  - Invalid name (empty string)
  - Invalid age (not a number or negative value)
  - Invalid contact (empty string)

#### 2. Boundary Value Analysis (BVA)
BVA tests the boundaries of valid input ranges:
- For age, we could test boundary values like:
  - 0 (lower bound for age)
  - 1 (valid lower bound)
  - 100 (upper bound for age)

- For name and contact, we might test length boundaries (e.g., empty string and long strings).

---

### Test Cases

#### delete.test.js - Deletes Profile

**Description:** This test file validates the deletion of profiles from the database.

##### Test Cases:

1. **Successful Deletion**
   - **Input:** Valid profile name (e.g., "John").
   - **Expected Outcome:** The profile is deleted, and the message "Data Deleted Successfully!!!" is logged.
   - **ECP Class:** Valid profile name input.

2. **Profile Does Not Exist**
   - **Input:** Non-existent profile name (e.g., "NonExistentProfile").
   - **Expected Outcome:** The message "No Profile Found with that Name." is logged.
   - **ECP Class:** Invalid profile name input.

3. **Deletion Failure**
   - **Input:** Simulated failure from the database.
   - **Expected Outcome:** The message "Operation Failed!!!" is logged.
   - **ECP Class:** Error scenario during deletion.

4. **Database Connection Error**
   - **Input:** Simulated database connection error.
   - **Expected Outcome:** Error message logged with the error details.
   - **ECP Class:** Database connection failure.

---

#### update.test.js - Updates Profile

**Description:** This test file verifies that profiles can be updated correctly.

##### Test Cases:

1. **Successful Profile Update**
   - **Input:** Valid update request (e.g., change age of 'John' to 31).
   - **Expected Outcome:** The profile is updated successfully, and the updated age is verified.
   - **ECP Class:** Valid update data.
   - **BVA Consideration:** Test with boundary age values like 0 and 100 (if those are valid) to ensure that edge cases are handled correctly.

2. **Invalid Field Update**
   - **Input:** Update request with an invalid field (e.g., changing 'invalidField').
   - **Expected Outcome:** The error message "Invalid field specified." is returned.
   - **ECP Class:** Invalid update field.

3. **Non-Numeric Age Update**
   - **Input:** Update request with a non-numeric age (e.g., 'notANumber').
   - **Expected Outcome:** The error message "Age must be a number." is returned.
   - **ECP Class:** Non-numeric age input.
   - **BVA Consideration:** Check with boundary numeric inputs like -1 (below valid range) and 0 (if zero is a valid boundary).

4. **Profile Not Found**
   - **Input:** Update request for a non-existent profile.
   - **Expected Outcome:** The error message "Profile not found." is returned.
   - **ECP Class:** Non-existent profile.

5. **Update Acknowledgment Failure**
   - **Input:** Valid update request that fails to acknowledge in the database.
   - **Expected Outcome:** The error message "Update operation failed." is returned.
   - **ECP Class:** Acknowledgment failure.
