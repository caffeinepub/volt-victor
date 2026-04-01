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

  type OrderItem = {
    productId: Text;
    productName: Text;
    price: Nat;
    quantity: Nat;
  };

  type Order = {
    id: Nat;
    studentName: Text;
    studentClass: Text;
    contact: Text;
    items: [OrderItem];
    totalAmount: Nat;
    timestamp: Int;
    done: Bool;
  };

  stable var inquiries: [Inquiry] = [];
  stable var nextId: Nat = 0;
  stable var adminPrincipal: ?Principal = null;

  stable var orders: [Order] = [];
  stable var nextOrderId: Nat = 0;

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

  // Anyone can place an order
  public func placeOrder(studentName: Text, studentClass: Text, contact: Text, items: [OrderItem], totalAmount: Nat): async Nat {
    let id = nextOrderId;
    nextOrderId += 1;
    let order: Order = {
      id;
      studentName;
      studentClass;
      contact;
      items;
      totalAmount;
      timestamp = Time.now();
      done = false;
    };
    orders := Array.append(orders, [order]);
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
          let arr = Array.tabulate(inquiries.size(), func(i: Nat): Inquiry {
            inquiries[inquiries.size() - 1 - i]
          });
          arr
        } else { [] }
      };
      case (null) { [] };
    }
  };

  // Admin only: get all orders
  public shared query(msg) func getOrders(): async [Order] {
    switch (adminPrincipal) {
      case (?p) {
        if (p == msg.caller) {
          let arr = Array.tabulate(orders.size(), func(i: Nat): Order {
            orders[orders.size() - 1 - i]
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

  // Admin only: mark order as done
  public shared(msg) func markOrderDone(id: Nat): async Bool {
    switch (adminPrincipal) {
      case (?p) {
        if (p != msg.caller) { return false };
        orders := Array.map(orders, func(o: Order): Order {
          if (o.id == id) { { o with done = true } } else { o }
        });
        true
      };
      case (null) { false };
    }
  };
};
