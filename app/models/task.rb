class Task < ApplicationRecord
  enum status: { todo: 0, in_progress: 1, done: 2 }

  validates :title, presence: true
  validates :status, inclusion: { in: statuses.keys }

  validate :todo_tasks_must_be_less_than_half, if: -> { status == 'todo' }

  private

  def todo_tasks_must_be_less_than_half
    todo_count = Task.where(status: 0).count
    total_count = Task.count
    if total_count > 0 && (todo_count + 1) > (total_count * 0.5)
      errors.add(:base, 'Cannot create new "To Do" task if "To Do" tasks are >= 50% of total tasks')
      throw :abort
    end
  end
end