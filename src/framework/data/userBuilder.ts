export interface DemoUser {
  fullName: string;
  email: string;
  currentAddress: string;
  permanentAddress: string;
}

export const buildDemoUser = (overrides: Partial<DemoUser> = {}): DemoUser => ({
  fullName: 'Staff Tester',
  email: 'staff.tester@example.com',
  currentAddress: 'Current Address, Cairo',
  permanentAddress: 'Permanent Address, Cairo',
  ...overrides,
});
