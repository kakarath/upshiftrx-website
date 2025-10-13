interface Connection {
  id: string;
  inUse: boolean;
  lastUsed: number;
}

class ConnectionPool {
  private connections: Connection[] = [];
  private maxConnections = 10;
  private idleTimeout = 300000; // 5 minutes
  
  async getConnection(): Promise<Connection> {
    // Find available connection
    let conn = this.connections.find(c => !c.inUse);
    
    if (!conn && this.connections.length < this.maxConnections) {
      // Create new connection
      conn = {
        id: crypto.randomUUID(),
        inUse: false,
        lastUsed: Date.now()
      };
      this.connections.push(conn);
    }
    
    if (!conn) {
      throw new Error('No available connections');
    }
    
    conn.inUse = true;
    conn.lastUsed = Date.now();
    return conn;
  }
  
  releaseConnection(conn: Connection) {
    conn.inUse = false;
    conn.lastUsed = Date.now();
  }
  
  cleanup() {
    const now = Date.now();
    this.connections = this.connections.filter(
      conn => !conn.inUse && (now - conn.lastUsed) < this.idleTimeout
    );
  }
}

export const dbPool = new ConnectionPool();

// Cleanup idle connections every 5 minutes
setInterval(() => dbPool.cleanup(), 300000);