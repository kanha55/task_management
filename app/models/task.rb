class Task < ApplicationRecord
  enum status: { todo: 0, in_progress: 1, done: 2 }

  validates :title, presence: true
  validates :status, inclusion: { in: statuses.keys }

  validate :todo_tasks_must_be_less_than_half, if: -> { status == 'todo' }

  private

  def todo_tasks_must_be_less_than_half
    if (Task.where(status: :todo).count + 1) > (Task.count * 0.5)
      errors.add(:status, "can't be 'To Do' as more than 50% of tasks would be 'To Do'")
    end
  end
end