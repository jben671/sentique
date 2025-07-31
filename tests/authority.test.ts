import { describe, it, expect, beforeEach } from "vitest"

const mockAuthorityContract = {
  admin: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
  verifiedAuthorities: new Map<string, { entityType: string; grade: string }>(),

  isAdmin(caller: string) {
    return caller === this.admin
  },

  addAuthority(caller: string, authority: string, entityType: string, grade: string) {
    if (!this.isAdmin(caller)) {
      return { error: 100 } // ERR-NOT-AUTHORIZED
    }
    if (this.verifiedAuthorities.has(authority)) {
      return { error: 101 } // ERR-ALREADY-VERIFIED
    }
    this.verifiedAuthorities.set(authority, { entityType, grade })
    return { value: true }
  },

  updateGrade(caller: string, authority: string, newGrade: string) {
    if (!this.isAdmin(caller)) return { error: 100 }
    if (!this.verifiedAuthorities.has(authority)) return { error: 102 }

    const record = this.verifiedAuthorities.get(authority)!
    this.verifiedAuthorities.set(authority, { ...record, grade: newGrade })
    return { value: true }
  },

  revokeAuthority(caller: string, authority: string) {
    if (!this.isAdmin(caller)) return { error: 100 }
    if (!this.verifiedAuthorities.has(authority)) return { error: 102 }

    this.verifiedAuthorities.delete(authority)
    return { value: true }
  },

  isVerified(authority: string) {
    return this.verifiedAuthorities.has(authority)
  },

  getEntityType(authority: string) {
    if (!this.verifiedAuthorities.has(authority)) return { error: 101 }
    return { value: this.verifiedAuthorities.get(authority)!.entityType }
  },

  getGrade(authority: string) {
    if (!this.verifiedAuthorities.has(authority)) return { error: 101 }
    return { value: this.verifiedAuthorities.get(authority)!.grade }
  },

  transferAdmin(caller: string, newAdmin: string) {
    if (!this.isAdmin(caller)) return { error: 100 }
    this.admin = newAdmin
    return { value: true }
  },
}

const ADMIN = "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM"
const USER1 = "ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG"
const USER2 = "ST3NBRSFKX28FQ2ZJ1MAKX58HKHSDGNV5N7R21XCP"

describe("Sentique Authority Verification Contract (Mock Test)", () => {
  beforeEach(() => {
    mockAuthorityContract.admin = ADMIN
    mockAuthorityContract.verifiedAuthorities = new Map()
  })

  it("should allow admin to add a verified authority", () => {
    const result = mockAuthorityContract.addAuthority(ADMIN, USER1, "manufacturer", "A+")
    expect(result).toEqual({ value: true })
    expect(mockAuthorityContract.isVerified(USER1)).toBe(true)
  })

  it("should prevent non-admin from adding authority", () => {
    const result = mockAuthorityContract.addAuthority(USER1, USER2, "retailer", "B")
    expect(result).toEqual({ error: 100 })
    expect(mockAuthorityContract.isVerified(USER2)).toBe(false)
  })

  it("should prevent duplicate authority registration", () => {
    mockAuthorityContract.addAuthority(ADMIN, USER1, "supplier", "A")
    const result = mockAuthorityContract.addAuthority(ADMIN, USER1, "supplier", "A")
    expect(result).toEqual({ error: 101 })
  })

  it("should update authority grade by admin", () => {
    mockAuthorityContract.addAuthority(ADMIN, USER1, "distributor", "B-")
    const result = mockAuthorityContract.updateGrade(ADMIN, USER1, "A+")
    expect(result).toEqual({ value: true })
    const grade = mockAuthorityContract.getGrade(USER1)
    expect(grade).toEqual({ value: "A+" })
  })

  it("should prevent non-admin from updating authority grade", () => {
    mockAuthorityContract.addAuthority(ADMIN, USER1, "inspector", "C")
    const result = mockAuthorityContract.updateGrade(USER2, USER1, "A")
    expect(result).toEqual({ error: 100 })
  })

  it("should revoke authority when called by admin", () => {
    mockAuthorityContract.addAuthority(ADMIN, USER1, "auditor", "B+")
    const result = mockAuthorityContract.revokeAuthority(ADMIN, USER1)
    expect(result).toEqual({ value: true })
    expect(mockAuthorityContract.isVerified(USER1)).toBe(false)
  })

  it("should prevent non-admin from revoking authority", () => {
    mockAuthorityContract.addAuthority(ADMIN, USER1, "compliance", "B")
    const result = mockAuthorityContract.revokeAuthority(USER2, USER1)
    expect(result).toEqual({ error: 100 })
  })

  it("should retrieve entity type and grade", () => {
    mockAuthorityContract.addAuthority(ADMIN, USER1, "logistics", "A")
    expect(mockAuthorityContract.getEntityType(USER1)).toEqual({ value: "logistics" })
    expect(mockAuthorityContract.getGrade(USER1)).toEqual({ value: "A" })
  })

  it("should return error for getting info of unregistered authority", () => {
    expect(mockAuthorityContract.getEntityType(USER2)).toEqual({ error: 101 })
    expect(mockAuthorityContract.getGrade(USER2)).toEqual({ error: 101 })
  })

  it("should transfer admin rights", () => {
    const result = mockAuthorityContract.transferAdmin(ADMIN, USER1)
    expect(result).toEqual({ value: true })
    expect(mockAuthorityContract.admin).toBe(USER1)

    const result2 = mockAuthorityContract.addAuthority(USER1, USER2, "farmer", "A")
    expect(result2).toEqual({ value: true })
  })
})
