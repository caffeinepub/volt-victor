import Array "mo:base/Array";
import Time "mo:base/Time";
import Principal "mo:base/Principal";

actor {
  type Inquiry = {
    id: Nat;
    name: Text;
    contact: Text;
    projectType: Text;
    details: Text;
    timestamp: Int;
    done: Bool;
  };

  stable var inquiries: [Inquiry] = [];
  stable var nextId: Nat = 0;
  stable var adminPrincipal: ?Principal = null;

  // Anyone can submit an inquiry
  public func submitInquiry(name: Text, contact: Text, projectType: Text, details: Text): async Nat {
    let id = nextId;
    nextId += 1;
    let inquiry: Inquiry = {
      id;
      name;
      contact;
      projectType;
      details;
      timestamp = Time.now();
      done = false;
    };
    inquiries := Array.append(inquiries, [inquiry]);
    id
  };

  // Set admin (first caller becomes admin)
  public shared(msg) func claimAdmin(): async Bool {
    switch (adminPrincipal) {
      case (null) {
        adminPrincipal := ?msg.caller;
        true
      };
      case (?_) { false };
    }
  };

  public shared query(msg) func isAdmin(): async Bool {
    switch (adminPrincipal) {
      case (?p) { p == msg.caller };
      case (null) { false };
    }
  };

  // Admin only: get all inquiries
  public shared query(msg) func getInquiries(): async [Inquiry] {
    switch (adminPrincipal) {
      case (?p) {
        if (p == msg.caller) {
          // Return newest first
          let arr = Array.tabulate(inquiries.size(), func(i: Nat): Inquiry {
            inquiries[inquiries.size() - 1 - i]
          });
          arr
        } else { [] }
      };
      case (null) { [] };
    }
  };

  // Admin only: mark inquiry as done
  public shared(msg) func markDone(id: Nat): async Bool {
    switch (adminPrincipal) {
      case (?p) {
        if (p != msg.caller) { return false };
        inquiries := Array.map(inquiries, func(inq: Inquiry): Inquiry {
          if (inq.id == id) { { inq with done = true } } else { inq }
        });
        true
      };
      case (null) { false };
    }
  };
};
